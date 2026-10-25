import { NextRequest, NextResponse } from "next/server";
import { aiBreakdownSchema } from "@/lib/validations/task";
import { generateRuleBasedBreakdown } from "@/lib/ai/planner";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = aiBreakdownSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { goal } = parsed.data;
    const subtasks = generateRuleBasedBreakdown(goal);

    return NextResponse.json({
      success: true,
      data: subtasks,
      goal,
    });
  } catch (error: any) {
    console.error("AI Breakdown Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error while breaking down goal" },
      { status: 500 }
    );
  }
}
