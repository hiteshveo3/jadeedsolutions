import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function MediaPane({ feature }) {
  const Icon = feature.icon;

  return (
    <aside className="sticky-media-pane" aria-label={`Visual preview for ${feature.title}`}>
      <div className={`sticky-media-frame is-${feature.accent}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={feature.title}
            className="sticky-media-card app-preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="sticky-media-topline">
              <span className="app-icon"><Icon size={15} strokeWidth={2} /></span>
              <span>{feature.kicker}</span>
              <span className="avatar-dot" />
            </div>
            <div className="sticky-media-visual" role="img" aria-label={feature.alt}>
              <div className="app-title-row">
                <strong>{feature.accent === "yellow" ? "Learning opportunities" : feature.accent === "blue" ? "Growth overview" : feature.accent === "orange" ? "Build log" : "All tasks"}</strong>
                <span>Search</span>
                <span>Filter</span>
              </div>
              {feature.accent === "dark" ? <TaskBoard /> : null}
              {feature.accent === "orange" ? <BuildLog prompt={feature.prompt} /> : null}
              {feature.accent === "yellow" ? <LearningPreview /> : null}
              {feature.accent === "blue" ? <GrowthPreview /> : null}
            </div>
            <div className="sticky-media-prompt">
              <span>{feature.prompt}</span>
              <button type="button" aria-label="Open prompt">→</button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}

function TaskBoard() {
  const columns = [
    ["Product", "Define MVP scope", "Implement auth", "Add due date reminders", "Review API performance"],
    ["Marketing", "Launch copy", "Plan beta onboarding", "Set up analytics", "Review ads"],
    ["Design", "Redesign card layout", "Create empty state", "Polish typography", "Export assets"],
    ["Content", "Write pages", "Draft FAQs", "Edit resources", "Update case study"]
  ];

  return (
    <div className="task-board">
      {columns.map(([title, ...tasks], index) => (
        <div className="task-column" key={title}>
          <header className={`task-head head-${index}`}>{title}<span>{tasks.length}</span></header>
          {tasks.map((task, taskIndex) => <p key={task}><span>{task}</span><em>{taskIndex % 2 ? "In Progress" : "Done"}</em></p>)}
        </div>
      ))}
    </div>
  );
}

function BuildLog({ prompt }) {
  const logs = ["login/signup flows", "user database", "roles/permissions logic", "product catalog/schema", "inventory tracking rules"];
  return (
    <div className="build-log">
      <div className="build-card">
        <strong>Jadeed</strong>
        <p>{prompt}</p>
        {logs.map((log) => <span key={log}>Wrote <em>{log}</em></span>)}
      </div>
    </div>
  );
}

function LearningPreview() {
  return (
    <div className="learning-preview">
      <div className="browser-pill">learn-it.jadeed.app</div>
      <div className="learning-shell">
        <aside><span /><span /><span /></aside>
        <main>
          <h4>Learning opportunities</h4>
          <small>Recently watched</small>
          <div><article /><article /></div>
        </main>
      </div>
    </div>
  );
}

function GrowthPreview() {
  return (
    <div className="growth-preview">
      {["Leads", "Bookings", "SEO", "Revenue"].map((item, index) => (
        <article key={item}>
          <span>{item}</span>
          <strong>{["128", "42", "91%", "$18k"][index]}</strong>
        </article>
      ))}
    </div>
  );
}
