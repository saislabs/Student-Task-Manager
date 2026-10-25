import { NextRequest, NextResponse } from "next/server";
import { aiPlannerSchema } from "@/lib/validations/task";
import { generateStudyPlanWithLLM } from "@/lib/ai/planner";

// In-memory rate limiting map for basic abuse prevention
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (max 10 requests per minute per IP)
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, resetTime: now + 60000 };

    if (now > rateData.resetTime) {
      rateData.count = 1;
      rateData.resetTime = now + 60000;
    } else {
      rateData.count++;
      if (rateData.count > 12) {
        return NextResponse.json(
          { error: "Too many requests. Please wait a minute before generating another plan." },
          { status: 429 }
        );
      }
    }
    rateLimitMap.set(ip, rateData);

    // 2. Parse & Validate Body
    const body = await req.json();
    const parsed = aiPlannerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // 3. Generate Plan
    const result = await generateStudyPlanWithLLM({
      examOrProjectName: parsed.data.examOrProjectName,
      subject: parsed.data.subject,
      deadlineDays: parsed.data.deadlineDays,
      studyHoursPerDay: parsed.data.studyHoursPerDay,
      topics: parsed.data.topics,
      preferredSessionMinutes: parsed.data.preferredSessionMinutes,
    });

    return NextResponse.json({
      success: true,
      data: result.plan,
      provider: result.provider,
      isFallback: result.provider === "rule-based",
    });
  } catch (error: any) {
    console.error("AI Plan Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error while generating study plan" },
      { status: 500 }
    );
  }
}
