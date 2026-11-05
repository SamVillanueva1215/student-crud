import React from 'react';
import { GraduationCap, RefreshCw, Users } from 'lucide-react';

export default function Navbar({ totalCount, onRefresh, loading }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Student Registry
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                VILLANUEVA-3A &bull; Spring Boot REST API
              </p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700 text-xs font-semibold">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{totalCount} {totalCount === 1 ? 'Student' : 'Students'}</span>
            </div>

            <button
              onClick={onRefresh}
              disabled={loading}
              title="Refresh student list"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
