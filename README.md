# Structure Solver - Project Plan & Documentation

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Development Phases](#development-phases)
- [Database Schema](#database-schema)
- [User Flows](#user-flows)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

## 🚀 Project Overview

**Structure Solver** is a comprehensive, MERN-stack-based web platform designed to be a one-stop solution for learning, practicing, and mastering Data Structures and Algorithms (DSA). It combines educational content, a full-featured online IDE, personalized user dashboards, and community engagement features to guide users from beginner to interview-ready.

### Tech Stack
- **Frontend**: React (with JSX), TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Code Execution**: Secure third-party API (e.g., Judge0)

## 🎯 Core Features

### A. Learning & Content
- **DSA Topic Pages**: Detailed articles with explanations, pseudo-code, and practice problems
- **DSA Practice Sheets**: Curated problem lists (e.g., "SDE Sheet," "Blind 75")
- **Learning Roadmaps**: Guided paths for different goals
- **Company-Specific Tracks**: Practice sheets targeting top tech companies
- **Embedded Video Explanations**: Video content on problem pages
- **Interactive Visualizers**: JavaScript-based algorithm animations

### B. The Online IDE & Practice
- **In-Built Code Editor**: Multi-language support (C++, Java, Python, JavaScript)
- **Secure Code Execution**: Sandboxed environment via third-party API
- **Custom Test Cases**: User-defined test cases for debugging
- **Submission & Judging**: Automated test case evaluation
- **Submission History**: Track all past attempts and results

### C. User Dashboard & Gamification
- **User Authentication**: Secure registration and login
- **Personalized Dashboard**: Key stats and progress tracking
- **Daily Streak System**: Consecutive day counter with visual calendar
- **Ranking & Leaderboard**: Global ranking based on performance
- **Progress Visualization**: GitHub-style heatmap or skill tree
- **DSA Tests**: Timed problem-solving assessments
- **Hints System**: Point-based hint unlocking

### D. Community & Social
- **Discussion Boards**: Problem-specific forums
- **Solution Sharing**: User-submitted solutions with voting
- **Public Profiles**: Shareable user statistics and achievements
- **Mock Interviews**: Shared IDE with video/audio chat via WebRTC

## 🗓️ Development Phases

### Phase 1: The Core Content & Foundation (MVP)
**Goal**: Build a non-interactive "knowledge base" and establish core architecture
- User Authentication (Login/Signup)
- Database Schemas: User, Problem, Topic, Sheet
- Admin Interface for content management
- Basic Topic, Sheet, and Problem pages
- Manual progress tracking ("Mark as Complete")

### Phase 2: The Interactive IDE
**Goal**: Enable interactive problem solving
- Code editor integration (Monaco/CodeMirror)
- Code execution API integration (Judge0)
- Custom test case execution
- Automated submission judging
- Submission history tracking

### Phase 3: Gamification & Engagement
**Goal**: Build user retention features
- Daily streak system implementation
- Ranking and leaderboard system
- Progress visualization (heatmaps)
- DSA test/assignment feature
- Hints system with points

### Phase 4: Community & Advanced Features
**Goal**: Create collaborative ecosystem
- Per-problem discussion boards
- Solution sharing with voting
- Public user profiles
- Mock interview feature (shared editor + WebRTC)
- Interactive algorithm visualizers

## 🗄️ Database Schema

```mermaid
classDiagram
    class User {
        +String userId
        +String username
        +String email
        +String passwordHash
        +Int streak
        +Int points
        +Date lastActive
        +String[] solvedProblemIds
        +String[] attemptedProblemIds
        +Object progressHeatmap
    }

    class Problem {
        +String problemId
        +String title
        +String description
        +String difficulty
        +String[] tags
        +String topicId
        +Object starterCode
        +Object hiddenTestCases
    }

    class Topic {
        +String topicId
        +String name
        +String description
        +String[] problemIds
    }

    class Sheet {
        +String sheetId
        +String name
        +String description
        +String[] problemIds
    }

    class Submission {
        +String submissionId
        +String userId
        +String problemId
        +String code
        +String language
        +String status
        +String output
        +Date timestamp
    }

    class DiscussionPost {
        +String postId
        +String userId
        +String problemId
        +String content
        +Date timestamp
        +String parentPostId
    }

    class Solution {
        +String solutionId
        +String userId
        +String problemId
        +String title
        +String explanation
        +String code
        +String language
        +Int upvotes
    }

    User "1" -- "0..*" Submission
    User "1" -- "0..*" DiscussionPost
    User "1" -- "0..*" Solution
    Problem "1" -- "0..*" Submission
    Problem "1" -- "0..*" DiscussionPost
    Problem "1" -- "0..*" Solution
    Topic "1" -- "0..*" Problem
    Sheet "1" -- "0..*" Problem
```

## 🔄 User Flows

### User Registration & Login
```mermaid
flowchart TD
    A[Start] --> B{User visits site};
    B --> C[Clicks Login/Register];
    C --> D{Has account?};
    D -- No --> E[Shows Register Form];
    E --> F[User submits info];
    F --> G{Info valid?};
    G -- No --> E;
    G -- Yes --> H[Create User in DB];
    H --> I[Generate auth token];
    I --> K[Redirect to Dashboard];
    D -- Yes --> J[Shows Login Form];
    J --> L[User submits credentials];
    L --> M{Credentials valid?};
    M -- No --> J;
    M -- Yes --> I;
    K --> Z[End];
```

### Problem Solving Workflow
```mermaid
flowchart TD
    A[User selects a Problem] --> B[View Problem Page];
    B --> C[Writes code in IDE];
    C --> D{Action?};
    D -- Run --> E[User writes Custom Test Cases];
    E --> F[Send Code, Test Cases to API];
    F --> G[API executes code];
    G --> H[Return output stdout/stderr];
    H --> C;
    D -- Submit --> I[Send Code, Language, ProblemID to API];
    I --> J[API executes code against Hidden Test Cases];
    J --> K{All tests pass?};
    K -- No --> L[Return Wrong Answer, TLE, etc.];
    L --> M[Save Submission to DB];
    M --> C;
    K -- Yes --> N[Return Accepted];
    N --> O[Save Submission to DB];
    O --> P[Update User's solved list, points, streak];
    P --> Q[Unlock Discussion & Solutions tabs];
    Q --> B;
```

### Mock Interview Flow
```mermaid
flowchart TD
    A[User A navigates to Mock Interview page] --> B[Clicks "Create Session"];
    B --> C[Generate unique session link];
    C --> D[User A shares link with User B];
    D --> E[User B joins link];
    E --> F[Both users connected via WebRTC];
    F --> G[Shared IDE is loaded];
    G --> H[User A Interviewer picks a problem];
    H --> I[User B Interviewee codes solution];
    I --> J{Session ends};
    J --> K[Both users disconnect];
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/structure-solver.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup
Create `.env` files in both backend and frontend directories with appropriate configuration variables.

### Development
```bash
# Start backend server
cd backend
npm run dev

# Start frontend development server
cd frontend
npm start
```

## 📞 Contact & Support

For questions, suggestions, or contributions, please contact the development team or create an issue in the repository.

---