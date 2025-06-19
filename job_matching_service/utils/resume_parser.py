import spacy
from docx import Document
from typing import Dict, List
import re

class ResumeParser:
    def __init__(self):
        # Load English language model
        self.nlp = spacy.load("en_core_web_sm")
        
        # Common technical skills to look for
        self.technical_skills = {
            "programming": ["python", "java", "javascript", "c++", "ruby", "php", "swift", "kotlin"],
            "frameworks": ["django", "flask", "fastapi", "spring", "react", "angular", "vue", "express"],
            "databases": ["mysql", "postgresql", "mongodb", "redis", "oracle", "sql server"],
            "tools": ["git", "docker", "kubernetes", "jenkins", "aws", "azure", "gcp"],
            "ai_ml": ["machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn"]
        }

    async def parse(self, file) -> Dict:
        """Parse the uploaded resume file and extract relevant information."""
        # Read the file content
        content = await self._read_file(file)
        
        # Extract information
        skills = self._extract_skills(content)
        experience = self._extract_experience(content)
        education = self._extract_education(content)
        
        return {
            "skills": skills,
            "experience": experience,
            "education": education
        }

    async def _read_file(self, file) -> str:
        """Read the content of the uploaded file."""
        content = await file.read()
        
        if file.filename.endswith('.docx'):
            doc = Document(file)
            return '\n'.join([paragraph.text for paragraph in doc.paragraphs])
        else:
            return content.decode('utf-8')

    def _extract_skills(self, content: str) -> List[str]:
        """Extract technical skills from the resume content."""
        content_lower = content.lower()
        found_skills = set()
        
        # Look for technical skills
        for category, skills in self.technical_skills.items():
            for skill in skills:
                if skill in content_lower:
                    found_skills.add(skill)
        
        # Use spaCy for named entity recognition
        doc = self.nlp(content)
        for ent in doc.ents:
            if ent.label_ in ['PRODUCT', 'ORG']:
                found_skills.add(ent.text.lower())
        
        return list(found_skills)

    def _extract_experience(self, content: str) -> float:
        """Extract years of experience from the resume content."""
        # Look for patterns like "X years of experience" or "X+ years"
        experience_patterns = [
            r'(\d+(?:\.\d+)?)\s*(?:years?|yrs?)\s*(?:of)?\s*experience',
            r'(\d+(?:\.\d+)?)\+?\s*(?:years?|yrs?)',
        ]
        
        for pattern in experience_patterns:
            matches = re.findall(pattern, content.lower())
            if matches:
                return float(matches[0])
        
        return 0.0  # Default to 0 years if no experience found

    def _extract_education(self, content: str) -> str:
        """Extract highest education level from the resume content."""
        education_levels = {
            "phd": ["phd", "doctorate", "doctoral"],
            "master's": ["master", "ms", "ma", "mba"],
            "bachelor's": ["bachelor", "bs", "ba", "b.tech", "b.e"],
            "associate's": ["associate", "aa", "as"],
            "high school": ["high school", "hs diploma"]
        }
        
        content_lower = content.lower()
        
        for level, keywords in education_levels.items():
            for keyword in keywords:
                if keyword in content_lower:
                    return level
        
        return "high school"  # Default to high school if no education found 