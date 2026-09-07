# Portfolio redesign plan

Reference: https://mehtab.work/ — reviewed September 7, 2026.

## Goal and scope

Create a professional replacement that retains Mehtab Mahir's identity, portrait, dark visual direction, and project content while improving clarity, visual hierarchy, and the path to project evidence and contact. Assume the primary audience is software engineering recruiters and hiring managers.

This is the planning deliverable. The existing website has not been changed, and a working copy has not yet been built. The local workspace currently contains no website source. A copy of the published appearance is a visual reconstruction unless the original source becomes available.

## Current-site baseline

Observed structure: header with Projects, About, Resume, Contact and theme control; introduction with name, role, education, portrait and social actions; biography; six projects; three skill categories; contact email.

The desktop presentation uses a near-black background, a subtle colored glow above the header, a circular portrait, and two-column project rows. Strengths include personal identity and real application screenshots. Observed issues include horizontal scrolling at the inspected browser size, inconsistent outer spacing, long project descriptions, uneven image scale, and low visual emphasis for supporting text. The biography delays access to project evidence. The accessibility tree also contains multiple top-level headings and project descriptions marked as headings.

Only the current desktop presentation and published content were reviewed. Mobile behavior, link destinations, resume delivery, performance, and full accessibility still require testing.

## Proposed direction

Keep the dark theme and portrait. Use a restrained violet accent, a centered content area around 1120–1200px, generous consistent gutters, clear typography, and readable secondary text. Give screenshots a consistent frame without cropping useful interface content. Use subtle interaction feedback and optional short entrance transitions, with reduced-motion support.

Suggested positioning: “Software engineer building practical desktop apps and AI-powered tools.” This describes the work without implying a current employer. Keep education in the supporting biography. Confirm current career details before release.

## Page structure

1. **Header:** name or initials; Work, About, Resume, Contact; visible keyboard focus.
2. **Hero:** name, specific positioning, a short supporting sentence, portrait, View projects and Resume actions. Keep GitHub, LinkedIn and email easy to find.
3. **Featured project:** give EasyWhisperUI a large screenshot, concise value statement, technology labels, and explicit Case study and Source actions where destinations are verified.
4. **Selected work:** initially prioritize Auto 60hz C++ and the YHack telemedicine project as complementary examples. Each card has a screenshot, two-line summary, personal role, technologies, and a clear action.
5. **More projects:** retain the database, Gemini, and Snake-learning work in a compact grid. Revisit ordering based on available evidence and target roles.
6. **About and capabilities:** shorten the personal story; connect skills to projects that demonstrate them. Include education and verified experience if supplied.
7. **Contact:** a direct email action, GitHub, LinkedIn, and resume access. Add availability only when confirmed.

## Project storytelling

Create a reusable case-study page with: problem and audience, personal contribution, key engineering decisions, screenshots or short demo, challenges and tradeoffs, verified outcome, and source/download links.

Start with EasyWhisperUI. Its published description provides topics to investigate: beginner onboarding, local transcription, GPU support, installation, and desktop architecture. Separate demonstrated features from claims requiring measurements. Do not invent download counts, performance gains, or users. Clarify individual contributions to team projects and verify absolute performance or security claims before reusing them.

## Delivery sequence

1. **Preserve the baseline:** obtain the source if available; otherwise inventory public text, images, actions and sections and reconstruct a local reference copy. Save screenshots and keep the original live site available.
2. **Prepare content:** verify professional details, resume, repository destinations, project status, screenshots, and personal contributions. Draft concise homepage copy and the featured case study.
3. **Design:** produce desktop and mobile mockups for the hero, featured project and project grid. Establish colors, type scale, spacing, buttons and image treatment.
4. **Build:** implement responsive homepage and reusable case-study pages. Reuse a suitable existing framework if source is supplied; otherwise use a lightweight content-oriented implementation. Keep project content separate from layout for easy updates.
5. **Verify:** check small phones through wide desktop layouts, keyboard navigation, heading structure, contrast, reduced motion, all links, resume access, image loading, metadata and sharing previews. Measure loading performance and fix material problems.
6. **Replace:** prepare a preview, verify content and deployment settings, then publish to the existing domain when replacement is authorized. Preserve a rollback copy and redirect any changed public URLs.

## Completion criteria

- The first screen explains who Mehtab is, what he builds, and where to view work.
- Project evidence follows the hero without a long biography in between.
- All six existing projects remain available, with stronger work receiving more space.
- No horizontal overflow at representative widths of 360, 390, 768, 1280 and 1440px.
- Cards have consistent imagery, concise summaries, and descriptive actions.
- All published claims and destinations are verified; no placeholders remain.
- Resume and contact are readily accessible on desktop and mobile.
- Keyboard navigation, visible focus, readable contrast and reduced motion work.
- Optimized images, page titles, descriptions and social previews are in place.

## Inputs to confirm during implementation

Target role emphasis; current resume and career status; access to original source and hosting; preferred contact address; up-to-date screenshots; project repository/demo links; individual contributions and any measurable outcomes.

These inputs do not block preparing the reference copy and initial design.
