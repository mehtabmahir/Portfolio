# Portfolio Content Review

Reviewed the homepage, all seven project pages, experience descriptions, About copy, resume/admin page copy, and the shared page template against the original portfolio, supplied resume, user corrections, and available public implementation files.

## Project Corrections

| Project | Problem and scope now explained | Evidence reviewed |
| --- | --- | --- |
| Auto 60 Hz | Battery consumption at high display refresh rates during video watching; lower rate on battery in full-screen mode, higher rate afterward or on AC. Full-screen state is a proxy, not video detection. | [README](https://github.com/mehtabmahir/auto-60hz-cpp#readme), [control loop](https://github.com/mehtabmahir/auto-60hz-cpp/blob/main/auto60hz.cpp), Qt window implementation, user's stated motivation. |
| EasyWhisperUI | Installation, model management, conversion, and GPU configuration are barriers to local transcription. Explains batch/live workflows and process boundaries. | [README](https://github.com/mehtabmahir/easy-whisper-ui#readme), supplied resume. Live transcription is marked beta; platform compatibility is qualified. |
| Workout Counter | Counting can interrupt a workout; camera tracking must distinguish completed repetitions from noise and partial movement. Bicep curls are currently implemented, with other exercises marked Coming Soon. | [Counter](https://github.com/mehtabmahir/Workout-Counter/blob/main/Workout%20Counter/BicepCurlCounter.swift), [capture and workout view](https://github.com/mehtabmahir/Workout-Counter/blob/main/Workout%20Counter/ContentView.swift), [exercise list](https://github.com/mehtabmahir/Workout-Counter/blob/main/Workout%20Counter/MainInterface.swift). |
| Telemedicine App | Preserve intake context when moving from AI chat to a doctor. Explains summaries, issue titles, doctor requests, and real-time messaging. | [Patient dashboard](https://github.com/Prainex/medicine-chatbot/blob/main2/app/user/dashboard/page.js), [doctor dashboard](https://github.com/Prainex/medicine-chatbot/blob/main2/app/user/doctor/page.js), [chat route](https://github.com/Prainex/medicine-chatbot/blob/main2/app/api/chat/route.js), original team/hackathon description. |
| Database Normalization | Organize sales records, establish relationships and keys, make loading repeatable, and enforce integrity. | Original portfolio write-up. Public repository returned Not Found; implementation was not independently verified. Removed the broken public source button, retaining the URL in the project data. Avoided conflating normalization with a star schema without source material. |
| Gemini Chatbot | Users can provide images or recorded speech instead of manually converting inputs to typed descriptions. Audio is transcribed before entering the text chat flow. | [App](https://github.com/mehtabmahir/geminichatbot/blob/chatbot/src/App.js), speech-to-text and text-to-speech modules, backend. README is starter-template text. Did not describe direct audio reasoning or speech synthesis as a verified end-to-end UI behavior. |
| Snake Reinforcement Learning | A learning experiment: derive actions from state and reward rather than a scripted path. Explains state encoding, action values, replay, exploration, plots, and checkpoints. | [Agent](https://github.com/mehtabmahir/machinelearning-py/blob/main/agent.py), [model](https://github.com/mehtabmahir/machinelearning-py/blob/main/model.py). No benchmark score was inferred. |

## Claims and Editorial Decisions

- The Auto 60 Hz README reports **up to 20% longer battery life**, but supplies no device, brightness, workload, or measurement protocol. The page attributes it as a reported upper estimate and links to the README. It is not presented as a verified benchmark or as 20% less energy consumption, which is a different metric.
- The README has an inconsistent sentence about full-screen versus non-full-screen operation. The revised description follows the control loop and the README's explicit usage steps: lower on full-screen while on battery.
- Auto 60 Hz can also lower the refresh rate of a full-screen game. It does not identify media content. This limitation is stated because it affects the core use case.
- Workout Counter's reusable architecture is distinguished from the number of currently available exercises.
- Telemedicine remains a four-person hackathon prototype; no individual ownership of specific components, clinical validation, or measured consultation-time saving is invented.
- User-provided experience and education are retained. Completed roles now use past tense. No changes were made to the supplied resume PDF.
- Titles remain in Title Case. Problems explain motivation; approach sections explain behavior; implementation decisions connect choices to the problem; outcome headings describe the actual result or scope.

## Verification

- Build and existing automated tests passed after the rewrite.
- Homepage project cards and project metadata use the same updated project data.
- All project routes remain unchanged.
- This review updates local source and preview. The live site requires the updated commit to be pushed and deployed.
