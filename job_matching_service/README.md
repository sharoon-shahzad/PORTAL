# Job Matching Microservice

This microservice uses AI algorithms (Greedy Best First Search and Hill Climbing) to match resumes with suitable job positions. It analyzes resumes and provides job recommendations based on skills, experience, and education.

## Features

- Resume parsing and information extraction
- Job matching using two AI algorithms:
  - Greedy Best First Search
  - Hill Climbing
- RESTful API endpoint for resume upload and job matching
- Detailed matching criteria and scores

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Download spaCy model:
```bash
python -m spacy download en_core_web_sm
```

4. Run the service:
```bash
uvicorn main:app --reload
```

The service will be available at `http://localhost:8000`

## API Usage

### Match Job Endpoint

**POST** `/match-job/`

Upload a resume file (PDF or DOCX) to get job recommendations.

Example using curl:
```bash
curl -X POST "http://localhost:8000/match-job/" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "resume=@path/to/your/resume.pdf"
```

Response format:
```json
{
    "job_title": "Senior Software Engineer",
    "match_score": 0.85,
    "algorithm_used": "Greedy Best First Search",
    "matching_criteria": {
        "skills": 0.9,
        "experience": 0.8,
        "education": 0.7
    }
}
```

## Project Structure

```
job_matching_service/
├── main.py              # FastAPI application
├── algorithms/
│   └── job_matcher.py   # Job matching algorithms
├── utils/
│   └── resume_parser.py # Resume parsing utilities
└── requirements.txt     # Project dependencies
```

## Contributing

Feel free to submit issues and enhancement requests! 