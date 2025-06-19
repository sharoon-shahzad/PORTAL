import numpy as np
from typing import Dict, List
from dataclasses import dataclass
from queue import PriorityQueue

@dataclass
class Job:
    title: str
    required_skills: List[str]
    required_experience: float
    required_education: str
    salary_range: tuple

class JobMatcher:
    def __init__(self):
        # Sample job database - in a real application, this would come from a database
        self.jobs = [
            Job(
                title="Senior Software Engineer",
                required_skills=["Python", "FastAPI", "Machine Learning"],
                required_experience=5.0,
                required_education="Bachelor's",
                salary_range=(80000, 120000)
            ),
            Job(
                title="Data Scientist",
                required_skills=["Python", "Machine Learning", "Statistics"],
                required_experience=3.0,
                required_education="Master's",
                salary_range=(70000, 110000)
            ),
            # Add more jobs as needed
        ]

    def calculate_skill_match(self, resume_skills: List[str], job_skills: List[str]) -> float:
        """Calculate the match score based on skills."""
        resume_skills_set = set(skill.lower() for skill in resume_skills)
        job_skills_set = set(skill.lower() for skill in job_skills)
        
        if not job_skills_set:
            return 0.0
            
        matching_skills = resume_skills_set.intersection(job_skills_set)
        return len(matching_skills) / len(job_skills_set)

    def calculate_experience_match(self, resume_exp: float, required_exp: float) -> float:
        """Calculate the match score based on experience."""
        if resume_exp >= required_exp:
            return 1.0
        return resume_exp / required_exp

    def calculate_education_match(self, resume_edu: str, required_edu: str) -> float:
        """Calculate the match score based on education level."""
        education_levels = {
            "high school": 1,
            "associate's": 2,
            "bachelor's": 3,
            "master's": 4,
            "phd": 5
        }
        
        resume_level = education_levels.get(resume_edu.lower(), 0)
        required_level = education_levels.get(required_edu.lower(), 0)
        
        if resume_level >= required_level:
            return 1.0
        return resume_level / required_level

    def calculate_total_match_score(self, resume_data: Dict, job: Job) -> float:
        """Calculate the total match score for a job."""
        skill_score = self.calculate_skill_match(resume_data["skills"], job.required_skills)
        exp_score = self.calculate_experience_match(resume_data["experience"], job.required_experience)
        edu_score = self.calculate_education_match(resume_data["education"], job.required_education)
        
        # Weighted average of different criteria
        weights = {"skills": 0.5, "experience": 0.3, "education": 0.2}
        total_score = (
            weights["skills"] * skill_score +
            weights["experience"] * exp_score +
            weights["education"] * edu_score
        )
        
        return total_score

    def greedy_best_first_search(self, resume_data: Dict) -> Dict:
        """Implement Greedy Best First Search algorithm for job matching."""
        # Priority queue to store jobs based on match score
        pq = PriorityQueue()
        
        # Calculate match scores for all jobs
        for job in self.jobs:
            match_score = self.calculate_total_match_score(resume_data, job)
            # Use negative score because PriorityQueue in Python is a min-heap
            pq.put((-match_score, job))
        
        # Get the best match
        best_score, best_job = pq.get()
        
        return {
            "job_title": best_job.title,
            "match_score": -best_score,  # Convert back to positive
            "criteria": {
                "skills": self.calculate_skill_match(resume_data["skills"], best_job.required_skills),
                "experience": self.calculate_experience_match(resume_data["experience"], best_job.required_experience),
                "education": self.calculate_education_match(resume_data["education"], best_job.required_education)
            }
        }

    def hill_climbing(self, resume_data: Dict) -> Dict:
        """Implement Hill Climbing algorithm for job matching."""
        current_job = self.jobs[0]
        current_score = self.calculate_total_match_score(resume_data, current_job)
        
        while True:
            # Get all neighbors (other jobs)
            neighbors = [job for job in self.jobs if job != current_job]
            if not neighbors:
                break
                
            # Find the best neighbor
            best_neighbor = max(
                neighbors,
                key=lambda job: self.calculate_total_match_score(resume_data, job)
            )
            best_neighbor_score = self.calculate_total_match_score(resume_data, best_neighbor)
            
            # If no better neighbor found, we've reached the peak
            if best_neighbor_score <= current_score:
                break
                
            # Move to the better neighbor
            current_job = best_neighbor
            current_score = best_neighbor_score
        
        return {
            "job_title": current_job.title,
            "match_score": current_score,
            "criteria": {
                "skills": self.calculate_skill_match(resume_data["skills"], current_job.required_skills),
                "experience": self.calculate_experience_match(resume_data["experience"], current_job.required_experience),
                "education": self.calculate_education_match(resume_data["education"], current_job.required_education)
            }
        } 