from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import uvicorn
from algorithms.job_matcher import JobMatcher
from utils.resume_parser import ResumeParser

app = FastAPI(title="Job Matching Service")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobMatchResponse(BaseModel):
    job_title: str
    match_score: float
    algorithm_used: str
    matching_criteria: Dict[str, float]

@app.post("/match-job/", response_model=JobMatchResponse)
async def match_job(resume: UploadFile = File(...)):
    try:
        # Parse resume
        resume_parser = ResumeParser()
        resume_data = await resume_parser.parse(resume)
        
        # Initialize job matcher
        job_matcher = JobMatcher()
        
        # Get matches using both algorithms
        greedy_match = job_matcher.greedy_best_first_search(resume_data)
        hill_climbing_match = job_matcher.hill_climbing(resume_data)
        
        # Return the better match
        if greedy_match["match_score"] >= hill_climbing_match["match_score"]:
            return JobMatchResponse(
                job_title=greedy_match["job_title"],
                match_score=greedy_match["match_score"],
                algorithm_used="Greedy Best First Search",
                matching_criteria=greedy_match["criteria"]
            )
        else:
            return JobMatchResponse(
                job_title=hill_climbing_match["job_title"],
                match_score=hill_climbing_match["match_score"],
                algorithm_used="Hill Climbing",
                matching_criteria=hill_climbing_match["criteria"]
            )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 