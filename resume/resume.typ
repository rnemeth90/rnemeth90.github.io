// Two-column resume layout. Data comes from content/cv.md via build.py.
#let cv = json(bytes(sys.inputs.at("cv")))

// Sections listed here go in the left column; everything else goes right.
#let left-sections = ("Summary", "Experience", "Education")

#let accent = rgb("#1E90FF")
#let ink = rgb("#111111")
#let body-color = rgb("#3a3a3a")
#let muted = rgb("#555555")

#set document(title: cv.name + " - Resume", author: cv.name)
#set page(paper: "us-letter", margin: (x: 0.42in, top: 0.4in, bottom: 0.35in))
#set text(font: "Rubik", size: 8.8pt, fill: body-color, lang: "en")
#set par(leading: 0.45em, spacing: 0.6em)
#set list(indent: 1pt, body-indent: 5pt, spacing: 0.42em, marker: text(fill: ink)[•])

// --- icons (simple inline SVGs; {c} is replaced with the fill color) ---
#let svg-calendar = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><g fill='{c}'><rect x='1.5' y='2.5' width='13' height='3.5' rx='1'/><rect x='4' y='0.8' width='1.8' height='3'/><rect x='10.2' y='0.8' width='1.8' height='3'/><rect x='1.5' y='7' width='3.5' height='3'/><rect x='6.25' y='7' width='3.5' height='3'/><rect x='11' y='7' width='3.5' height='3'/><rect x='1.5' y='11.2' width='3.5' height='3'/><rect x='6.25' y='11.2' width='3.5' height='3'/><rect x='11' y='11.2' width='3.5' height='3'/></g></svg>"
#let svg-pin = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path d='M8 0.6C5 0.6 2.8 2.9 2.8 5.8 2.8 9.6 8 15.4 8 15.4S13.2 9.6 13.2 5.8C13.2 2.9 11 0.6 8 0.6Z' fill='{c}'/><circle cx='8' cy='5.8' r='2' fill='white'/></svg>"
#let svg-link = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><g fill='none' stroke='{c}' stroke-width='1.7' stroke-linecap='round'><path d='M6.3 9.7l3.4-3.4'/><path d='M7.2 4.6l1.4-1.4a2.9 2.9 0 0 1 4.2 4.2L11.4 8.8'/><path d='M8.8 11.4l-1.4 1.4a2.9 2.9 0 0 1-4.2-4.2L4.6 7.2'/></g></svg>"
#let svg-gem = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 16'><g fill='none' stroke='{c}' stroke-width='1.3' stroke-linejoin='round'><path d='M4.5 1.5h9l3.5 4.5-8 8.5-8-8.5z'/><path d='M1 6h16M6.5 1.5 5.5 6 9 14.5 12.5 6 11.5 1.5M5.5 6 9 1.5 12.5 6'/></g></svg>"

#let icon(svg, color: muted, size: 0.95em) = box(
  baseline: 15%,
  image(bytes(svg.replace("{c}", color.to-hex())), format: "svg", height: size),
)

// --- building blocks ---
#let dashed = line(length: 100%, stroke: (paint: rgb("#b8b8b8"), thickness: 0.6pt, dash: (2pt, 1.5pt)))

#let section-title(t) = block(above: 14pt, below: 7pt, sticky: true, stack(
  spacing: 3pt,
  text(font: "Rubik", size: 12.5pt, weight: 500, fill: ink, upper(t)),
  line(length: 100%, stroke: 2.6pt + ink),
))

#let body-blocks(blocks) = for b in blocks {
  if "p" in b { par(b.p) } else if "ul" in b { list(..b.ul.map(i => [#i])) }
}

#let meta-line(e) = {
  let parts = ()
  if "date" in e { parts.push([#icon(svg-calendar) #h(2pt) #e.date]) }
  if "location" in e { parts.push([#icon(svg-pin) #h(2pt) #e.location]) }
  if parts.len() > 0 { text(size: 8pt, fill: muted, parts.join(h(10pt))) }
}

#let entry(e) = block(breakable: true, width: 100%, {
  // keep the title/org/date header together and attached to the body
  block(breakable: false, sticky: true, above: 0pt, below: 0pt, stack(spacing: 5.5pt,
    text(size: 9.8pt, weight: 500, fill: ink, e.title),
    ..if "org" in e { (text(size: 9.8pt, weight: 500, fill: accent, e.org),) },
    ..if "subtitle" in e { (text(fill: muted, e.subtitle),) },
    ..if "url" in e { (text(size: 8pt, fill: muted)[#icon(svg-link) #h(2pt) #link(e.url, e.url)],) },
    ..if "date" in e or "location" in e { (meta-line(e),) },
  ))
  if e.body.len() > 0 { v(5pt); body-blocks(e.body) }
})

#let achievement(e) = grid(
  columns: (22pt, 1fr),
  align: top,
  pad(top: 1pt, icon(svg-gem, color: accent, size: 13pt)),
  stack(spacing: 4pt,
    text(size: 9.6pt, weight: 500, fill: ink, e.title),
    body-blocks(e.body),
  ),
)

#let tag(t) = box(
  inset: (x: 6pt, top: 3pt, bottom: 5pt),
  stroke: (bottom: 1pt + rgb("#9a9a9a")),
  text(size: 8.4pt, weight: 500, fill: rgb("#333333"), t),
)

#let section(s) = {
  section-title(s.title)
  if "tags" in s {
    par(leading: 1em, s.tags.map(tag).join(h(5pt)))
  } else if "entries" in s {
    let render = if s.title == "Key Achievements" { achievement } else { entry }
    let sep = block(above: 7pt, below: 7pt, dashed)
    s.entries.map(render).join(sep)
  } else if "body" in s {
    body-blocks(s.body)
  }
}

// --- header ---
#block(below: 4pt, text(size: 25pt, weight: 700, fill: ink, upper(cv.name)))
#block(below: 9pt, text(size: 11pt, weight: 500, fill: accent, cv.tagline))
#block(below: 6pt, text(size: 8.4pt, weight: 500, fill: rgb("#333333"),
  cv.links.map(l => [#icon(svg-link, color: accent) #h(1pt) #link(l.url, l.text)]).join(h(12pt)),
))

// --- body ---
#grid(
  columns: (1.5fr, 1fr),
  column-gutter: 0.38in,
  cv.sections.filter(s => s.title in left-sections).map(section).join(),
  cv.sections.filter(s => s.title not in left-sections).map(section).join(),
)
