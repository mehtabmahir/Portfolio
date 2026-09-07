export const projects = [
  {
    "slug": "easy-whisper-ui",
    "title": "EasyWhisperUI",
    "category": "DESKTOP APPLICATION · LOCAL AI",
    "image": "whisper.png",
    "tags": [
      "Electron",
      "React",
      "TypeScript",
      "whisper.cpp"
    ],
    "url": "https://github.com/mehtabmahir/easy-whisper-ui",
    "summary": "Run Whisper locally without setting up a command-line workflow.",
    "description": "A desktop transcription app that handles model downloads, media conversion, and GPU setup, with batch queues and live transcription.",
    "role": "Desktop application development",
    "problem": "People who want to transcribe recordings locally can run Whisper, but getting started involves model files, media conversion, dependencies, and hardware-specific configuration. Repeating those steps for a folder of recordings adds more work. The goal was to make local transcription usable without requiring users to assemble that workflow themselves.",
    "solution": "EasyWhisperUI puts model selection, downloads, FFmpeg preprocessing, and transcription in one desktop app. Users can queue recordings, export text or timestamped subtitles, or use live transcription. Audio processing runs locally through whisper.cpp, with GPU acceleration where supported.",
    "decisions": [
      [
        "Setup That Matches the Hardware",
        "Automated setup validates dependencies and prepares Whisper. Windows uses Vulkan on supported GPUs, while Apple Silicon uses Metal. This addresses installation and configuration work before the first transcription."
      ],
      [
        "A Separate Boundary for Privileged Operations",
        "The Electron renderer has no direct Node.js access. A narrow preload bridge connects the React interface to main-process operations such as file handling and transcription, keeping those responsibilities separate."
      ],
      [
        "Batch and Live Workflows",
        "A sequential queue handles multiple recordings, FFmpeg converts inputs, and model downloads happen when needed. Live transcription provides a separate path for ongoing audio and is currently marked beta."
      ]
    ],
    "outcome": "Available for Windows, macOS, and Linux, with text and SRT output and more than 500 GitHub stars. Transcription speed depends on the model and available hardware; Linux compatibility can vary by distribution.",
    "outcomeTitle": "Result and Compatibility"
  },
  {
    "slug": "auto-60hz",
    "title": "Auto 60 Hz",
    "category": "WINDOWS UTILITY",
    "image": "refresh.png",
    "tags": [
      "C++",
      "Qt",
      "WinAPI"
    ],
    "url": "https://github.com/mehtabmahir/auto-60hz-cpp",
    "summary": "Save laptop battery by lowering the refresh rate during full-screen video.",
    "description": "Switches from 120 Hz to 60 Hz for full-screen playback on battery, then restores the higher rate afterward. Both refresh rates are configurable.",
    "role": "Windows application development",
    "problem": "Keeping a laptop display at 120 Hz can use more battery power even when the content does not need that refresh rate. A 30 or 60 fps video does not contain 120 unique frames per second, yet the display may remain at 120 Hz throughout playback. I wanted to reduce that unnecessary power use while keeping a higher refresh rate for everyday interaction.",
    "solution": "Auto 60 Hz checks the foreground window and power source. While running on battery, it selects the configured lower refresh rate when the tracked window is full-screen and restores the higher rate after full-screen mode ends. Connecting AC power also restores the higher rate. The Qt interface exposes both values and a run-on-startup option.",
    "decisions": [
      [
        "Battery-Aware Switching",
        "The control loop checks Windows power status before lowering the refresh rate. This targets battery-powered use instead of applying the same policy while the device is plugged in."
      ],
      [
        "Full-Screen Detection as the Trigger",
        "WinAPI supplies window bounds and PSAPI identifies processes. Known Windows system processes are excluded. Full-screen state is a practical trigger for video watching; the app does not inspect playback frame rate or identify video content."
      ],
      [
        "Configurable Rates and Periodic Checks",
        "Users choose the high and low refresh rates to suit their display. The background loop checks once per second and avoids requesting a display change when the target rate is already active."
      ]
    ],
    "outcome": "The project README reports up to 20% longer battery life from reducing the refresh rate. Treat this as a reported upper estimate rather than a guaranteed gain: results depend on the display, brightness, workload, and device. Full-screen games can also trigger the lower rate because the app detects window state, not media type.",
    "outcomeTitle": "Battery Benefit and Tradeoffs"
  },
  {
    "slug": "telemedicine",
    "title": "Telemedicine App",
    "category": "YHack 2024 · TEAM PROJECT",
    "image": "telemedicine.png",
    "tags": [
      "Next.js",
      "Firebase",
      "OpenAI"
    ],
    "url": "https://github.com/Prainex/medicine-chatbot/tree/main2",
    "summary": "Carry an AI-assisted intake conversation into a doctor chat.",
    "description": "A four-person YHack prototype that collects symptoms through chat, summarizes the conversation, and lets a doctor review the context before responding.",
    "role": "Member of a four-person hackathon team",
    "problem": "A patient describing symptoms in an initial chat may need to repeat that information when a clinician joins. The hackathon project explored how to carry the conversation into a doctor-facing workflow, so the handoff includes the context already collected.",
    "solution": "Built with three teammates in 24 hours at YHack 2024, the prototype combines an OpenAI-assisted intake chat with a request to speak to a doctor. That request generates a short conversation summary and issue title. A doctor dashboard exposes the context and supports real-time patient–doctor messaging through Firebase.",
    "decisions": [
      [
        "Preserve Context at Handoff",
        "The patient flow requests a summary and short issue title from the conversation before creating the doctor request. This gives the doctor an entry point into the discussion rather than an empty chat."
      ],
      [
        "Separate AI and Doctor Responses",
        "The chat route checks whether a doctor is active and stops generating AI responses for that interaction. Separate patient and doctor views support the change in who is responding."
      ],
      [
        "Real-Time State in a Hackathon Prototype",
        "Firestore listeners update chat state and messages in both views. Next.js and Material UI provide the interface, allowing the team to focus on the intake-to-handoff flow within the time limit."
      ]
    ],
    "outcome": "The prototype implements intake, summarization, and doctor messaging. Its intended benefit is less repetition during handoff; no measured reduction in consultation time or clinical validation is claimed.",
    "outcomeTitle": "Prototype Outcome"
  },
  {
    "slug": "database-normalization",
    "title": "Database Normalization",
    "category": "DATA ENGINEERING",
    "tags": [
      "T-SQL",
      "SQL Server",
      "Data modeling"
    ],
    "url": "https://github.com/mehtabmahir/Database-Normalization",
    "summary": "Organize raw sales data into a consistent SQL Server schema.",
    "description": "Led a six-person project covering sales-data modeling, integrity constraints, repeatable load scripts, and stored procedures.",
    "role": "Team lead, six-person project",
    "problem": "Raw sales records need consistent entities, relationships, and keys before they can support reliable queries. When the same information is repeated across records, updates can become inconsistent; loading data without clear constraints can introduce invalid relationships. The project addressed that structure and loading problem in SQL Server.",
    "solution": "I led a six-person team working on entity relationship diagrams, schema design, automated loading, sequence-based keys, and stored procedures. The project organized sales data for querying while using database constraints to capture relationships and business rules.",
    "decisions": [
      [
        "Define Entities and Relationships",
        "ERDs establish which records belong together and how keys connect them. This gives the team a shared model before writing loading and query logic."
      ],
      [
        "Make Loading Repeatable",
        "Automated load scripts turn data preparation into a process that can be rerun, rather than a sequence of manual database edits. Sequence-based keys provide identifiers for inserted records."
      ],
      [
        "Enforce Rules in SQL Server",
        "Integrity constraints and stored procedures put relationship checks and business logic in the database, where they can be applied consistently across data operations."
      ]
    ],
    "outcome": "The deliverables included schema diagrams, load scripts, keys, constraints, and stored procedures. Together, these components address how sales records are structured, loaded, and checked in SQL Server.",
    "outcomeTitle": "Project Deliverables",
    "sourceAvailable": false
  },
  {
    "slug": "gemini-chatbot",
    "title": "Gemini Chatbot",
    "category": "AI APPLICATION",
    "tags": [
      "React",
      "Gemini API",
      "Google Cloud"
    ],
    "url": "https://github.com/mehtabmahir/geminichatbot",
    "summary": "Ask questions with text, images, or recorded speech.",
    "description": "A React chatbot that accepts image uploads and microphone recordings, using Gemini and Google Cloud Speech-to-Text to process the inputs.",
    "role": "AI application development",
    "problem": "A text-only chat requires users to type a question and describe any visual information themselves. This project explored letting users supply an image or record speech within the same conversation instead of converting everything into typed text first.",
    "solution": "The React interface supports typed messages, image uploads, and audio recording. Recorded audio is transcribed through Google Cloud Speech-to-Text and then sent through the text conversation flow. Images use a separate upload-and-response path, and the conversation displays the resulting responses.",
    "decisions": [
      [
        "Speech Feeds the Existing Chat Flow",
        "The audio handler converts a recording into a transcript and passes that text to the same send-message function used for typed input. Audio is transcribed before prompting the model rather than described as direct audio reasoning."
      ],
      [
        "A Separate Image Upload Path",
        "An image upload is sent to the backend, and the returned image and result are inserted into the conversation. This supports visual questions alongside ordinary text messages."
      ],
      [
        "One Conversation Interface",
        "React manages message history and input controls while asynchronous request handlers update the conversation. This keeps different input types within one interaction pattern."
      ]
    ],
    "outcome": "The repository contains the text, image, and recorded-speech flows, along with speech-synthesis code. Running the development project requires configuring the API services and local backend URLs.",
    "outcomeTitle": "Implemented Scope"
  },
  {
    "slug": "learning-snake",
    "title": "Snake Reinforcement Learning",
    "category": "MACHINE LEARNING",
    "tags": [
      "Python",
      "PyTorch",
      "Reinforcement learning"
    ],
    "url": "https://github.com/mehtabmahir/machinelearning-py",
    "summary": "Learn a Snake-playing policy from rewards instead of scripted moves.",
    "description": "A PyTorch Q-learning experiment that trains on recent moves and replayed experience, with score plots and saved best-performing model weights.",
    "role": "Machine learning project",
    "problem": "The learning question was how an agent could choose moves from game state and rewards without a hand-written route to the food. It needed to represent nearby danger, direction, and food position, explore unfamiliar moves, and learn from unsuccessful games.",
    "solution": "The agent encodes the game as 11 state values and uses a neural network to estimate the value of three relative actions: straight, right, or left. Training happens after individual moves and from sampled replay memory after each game. The game restarts automatically so learning can continue.",
    "decisions": [
      [
        "A Compact State Representation",
        "The state includes danger ahead and to either side, the current direction, and the food’s relative location. An 11–256–3 network maps those inputs to action values without processing raw screen pixels."
      ],
      [
        "Learn from New and Previous Moves",
        "A replay buffer stores up to 100,000 transitions. Training combines recent transitions with batches of up to 1,000 stored experiences instead of relying only on the last move."
      ],
      [
        "Track Learning Across Games",
        "Random exploration decreases as the game count increases. Per-game and running-average scores are plotted, and model weights are saved when a new high score is reached."
      ]
    ],
    "outcome": "The result is an inspectable training loop, score history, and saved model checkpoints. The per-game and average-score plots make changes in performance visible across a training run.",
    "outcomeTitle": "Experiment Output"
  },
  {
    "slug": "workout-counter",
    "title": "Workout Counter iOS",
    "category": "iOS · ON-DEVICE VISION",
    "tags": [
      "SwiftUI",
      "AVFoundation",
      "Apple Vision"
    ],
    "url": "https://github.com/mehtabmahir/Workout-Counter",
    "summary": "Count bicep-curl repetitions without taking attention away from the exercise.",
    "description": "An iOS app that counts bicep curls from on-device camera input, with repetition goals, a live pose overlay, and audio and haptic feedback.",
    "role": "iOS application development",
    "problem": "Keeping track of repetitions can distract from the exercise, and checking a counter repeatedly adds another interruption. Automating the count with a camera introduces a second problem: joint detections fluctuate, wrists can leave the frame, and a partial movement should not count as a complete repetition.",
    "solution": "The app uses AVFoundation to capture camera frames and Apple Vision to estimate body joints on the device. A bicep-curl counter follows arm extension and flexion, updates the repetition total, and signals progress toward a chosen goal. A live skeletal overlay shows what the camera is tracking.",
    "decisions": [
      [
        "On-Device Pose Detection",
        "The counting pipeline processes camera frames with Apple Vision on the phone. This supports the app’s no-account workflow without sending workout video to a remote inference service."
      ],
      [
        "Count Complete Movements",
        "The counter combines joint angles, smoothing, confidence checks, and extension/flexion states. Motion history and missing-frame tolerance help handle brief tracking gaps instead of treating every change in angle as a repetition."
      ],
      [
        "Feedback and an Extendable Counter Interface",
        "Repetition goals and audio/haptic cues reduce the need to watch the display. An ExerciseCounter interface separates movement logic from the camera and screen, providing a basis for additional exercise counters."
      ]
    ],
    "outcome": "Bicep curls are the currently available exercise in the public implementation; other exercises are listed as Coming Soon. Counting depends on camera placement and visible joints. This is repetition tracking, not a validated assessment of exercise form.",
    "outcomeTitle": "Current Scope"
  }
];
