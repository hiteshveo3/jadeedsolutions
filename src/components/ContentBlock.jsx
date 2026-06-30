import React from "react";

export function ContentBlock({ feature, index, total, active, itemRefs }) {
  return (
    <article
      ref={(node) => {
        itemRefs.current[index] = node;
      }}
      className={`sticky-feature-block${active ? " active" : ""}`}
      data-index={index}
    >
      <span className="sticky-feature-count">
        <strong>{String(index + 1).padStart(2, "0")}</strong>
        <em>/</em>
        <span>{String(total).padStart(2, "0")}</span>
      </span>
      <h3>{feature.title}</h3>
      <p>{feature.body}</p>
      {feature.cta ? <a className="sticky-feature-cta" href="/contact/">{feature.cta}</a> : null}
    </article>
  );
}
