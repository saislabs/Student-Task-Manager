"use client";

import { useState } from "react";
import {
  User,
  Palette,
  Clock,
  BookOpen,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Plus,
  Check,
  Edit2,
  AlertTriangle,
} from "lucide-react";
import { useTaskStore } from "@/lib/store/task-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Subject } from "@/types";
import { toast } from "sonner";

export default function SettingsPage() {
  const {
    profile,
    subjects,
    theme,
    toggleTheme,
    setTheme,
    updateProfile,
    addSubject,
    updateSubject,
    deleteSubject,
    loadSampleData,
    clearWorkspace,
    exportDataAsJSON,
    importDataFromJSON,
  } = useTaskStore();

  // Profile Form
  const [name, setName] = useState(profile.full_name);
  const [timezone, setTimezone] = useState(profile.timezone);
  const [studyDuration, setStudyDuration] = useState(profile.study_duration_pref);

  // Subject Management
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectColor, setNewSubjectColor] = useState("#3B82F6");
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  // Modals / Confirmations
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      full_name: name,
      timezone,
      study_duration_pref: Number(studyDuration),
    });
    toast.success("Profile preferences saved!");
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) {
      toast.error("Subject name cannot be empty");
      return;
    }
    addSubject(newSubjectName.trim(), newSubjectColor);
    setNewSubjectName("");
    toast.success("Subject added!");
  };

  const handleUpdateSubject = () => {
    if (!editingSubject || !editingSubject.name.trim()) return;
    updateSubject(editingSubject.id, {
      name: editingSubject.name.trim(),
      color: editingSubject.color,
    });
    setEditingSubject(null);
    toast.success("Subject updated!");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importDataFromJSON(content);
      if (res.success) {
        toast.success("Workspace data restored successfully!");
      } else {
        toast.error(`Import failed: ${res.error}`);
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = "";
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-2 border-b border-white/5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Workspace Preferences</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure your student profile, academic subjects, appearance theme, and data backups.
        </p>
      </div>

      {/* 1. Profile & Study Preferences */}
      <div className="rounded-2xl bg-navy-900/80 border border-white/10 p-6 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/5 mb-5">
          <div className="h-8 w-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-semibold text-white">Student Profile & Timezone</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="studentName"
              label="Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-white/10 bg-navy-950/80 px-3 py-2 text-xs text-slate-100 focus:outline-none"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Preferred Study Block Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[25, 45, 60, 90].map((dur) => (
                <button
                  type="button"
                  key={dur}
                  onClick={() => setStudyDuration(dur)}
                  className={`py-2 text-center rounded-xl text-xs font-semibold border transition-all ${
                    studyDuration === dur
                      ? "bg-brand-500 text-white border-brand-400 shadow-md shadow-brand-500/25"
                      : "bg-navy-950/60 text-slate-400 border-white/10 hover:border-white/20"
                  }`}
                >
                  {dur} mins
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              Save Profile Preferences
            </Button>
          </div>
        </form>
      </div>

      {/* 2. Theme & Appearance */}
      <div className="rounded-2xl bg-navy-900/80 border border-white/10 p-6 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/5 mb-5">
          <div className="h-8 w-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Palette className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-semibold text-white">Appearance & Theme</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Theme Mode</p>
            <p className="text-xs text-slate-400">
              Current mode is <strong className="text-slate-200 capitalize">{theme}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme("dark")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                theme === "dark"
                  ? "bg-brand-500 text-white border-brand-400"
                  : "bg-navy-950 text-slate-400 border-white/10"
              }`}
            >
              Dark Theme
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                theme === "light"
                  ? "bg-brand-500 text-white border-brand-400"
                  : "bg-navy-950 text-slate-400 border-white/10"
              }`}
            >
              Light Theme
            </button>
          </div>
        </div>
      </div>

      {/* 3. Subject Management */}
      <div className="rounded-2xl bg-navy-900/80 border border-white/10 p-6 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/5 mb-5">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <BookOpen className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-semibold text-white">Academic Subjects / Courses</h2>
        </div>

        {/* Existing Subjects */}
        <div className="space-y-2.5 mb-6">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between p-3 rounded-xl bg-navy-950/70 border border-white/5"
            >
              {editingSubject?.id === sub.id ? (
                <div className="flex items-center gap-2 flex-1 mr-3">
                  <input
                    type="color"
                    value={editingSubject.color}
                    onChange={(e) =>
                      setEditingSubject({ ...editingSubject, color: e.target.value })
                    }
                    className="h-8 w-8 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={editingSubject.name}
                    onChange={(e) =>
                      setEditingSubject({ ...editingSubject, name: e.target.value })
                    }
                    className="flex-1 h-8 px-2.5 rounded-lg bg-navy-900 border border-white/10 text-xs text-white"
                  />
                  <button
                    onClick={handleUpdateSubject}
                    className="p-1.5 rounded-lg bg-brand-500 text-white text-xs"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: sub.color }}
                  />
                  <span className="text-xs font-semibold text-slate-200">{sub.name}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                {editingSubject?.id !== sub.id && (
                  <button
                    onClick={() => setEditingSubject(sub)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                    title="Edit subject"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => {
                    deleteSubject(sub.id);
                    toast.success(`Deleted subject: ${sub.name}`);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400"
                  title="Delete subject"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Subject */}
        <form onSubmit={handleAddSubject} className="flex gap-2">
          <input
            type="color"
            value={newSubjectColor}
            onChange={(e) => setNewSubjectColor(e.target.value)}
            className="h-10 w-10 rounded-xl cursor-pointer bg-navy-950 border border-white/10 p-1"
          />
          <input
            type="text"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            placeholder="Add new subject (e.g. Cloud Computing)"
            className="flex-1 h-10 px-3 rounded-xl border border-white/10 bg-navy-950/80 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
          />
          <Button type="submit" variant="primary" size="sm" className="shrink-0">
            <Plus className="h-4 w-4 mr-1" /> Add Subject
          </Button>
        </form>
      </div>

      {/* 4. Data Backup, Export & Reset */}
      <div className="rounded-2xl bg-navy-900/80 border border-white/10 p-6 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/5 mb-5">
          <div className="h-8 w-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Download className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Workspace Data Management</h2>
            <p className="text-[11px] text-slate-400">
              Export and import your study workspace locally as JSON.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Export JSON */}
          <div className="p-4 rounded-xl bg-navy-950/70 border border-white/5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-white mb-1">Backup Workspace Data</p>
              <p className="text-[11px] text-slate-400 mb-3">
                Download all your tasks, subjects, and study settings as an offline JSON file.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={exportDataAsJSON}
              className="text-xs w-full"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" /> Download JSON Backup
            </Button>
          </div>

          {/* Import JSON */}
          <div className="p-4 rounded-xl bg-navy-950/70 border border-white/5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-white mb-1">Restore from Backup</p>
              <p className="text-[11px] text-slate-400 mb-3">
                Upload a previously saved STUDYFLOW AI JSON file to restore your workspace.
              </p>
            </div>
            <label className="inline-flex items-center justify-center h-8 px-3 rounded-xl border border-white/15 bg-navy-850 hover:bg-navy-800 text-xs font-medium text-slate-200 cursor-pointer transition-colors w-full">
              <Upload className="h-3.5 w-3.5 mr-1.5 text-brand-400" />
              Upload Backup File
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Danger Zone: Reset Sample Data / Clear Workspace */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowResetConfirm(true)}
            className="text-xs w-full sm:w-auto"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-brand-400" />
            Reset to Sample Demo Data
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowClearConfirm(true)}
            className="text-xs w-full sm:w-auto"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Clear Entire Workspace
          </Button>
        </div>
      </div>

      {/* Confirmation Modals */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold text-white mb-2">Reset to Sample Data?</h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              This will replace current tasks with the preloaded student demo dataset.
            </p>
            <div className="flex justify-end gap-3">
              <Button size="sm" variant="ghost" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  loadSampleData();
                  setShowResetConfirm(false);
                  toast.success("Reset to sample student data!");
                }}
              >
                Confirm Reset
              </Button>
            </div>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold text-rose-400 mb-2">Clear All Workspace Data?</h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Are you sure? This will permanently delete all tasks in this browser session.
            </p>
            <div className="flex justify-end gap-3">
              <Button size="sm" variant="ghost" onClick={() => setShowClearConfirm(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  clearWorkspace();
                  setShowClearConfirm(false);
                  toast.success("Workspace cleared.");
                }}
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
