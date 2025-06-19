import React, { useState, useRef, useEffect } from 'react'
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import 'quill/dist/quill.snow.css';

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Banglore');
    const [category, setCategory] = useState('Management');
    const [level, setLevel] = useState('Beginner');
    const [salary, setSalary] = useState(50000);
    const [description, setDescription] = useState('');

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            const toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean']
            ];

            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: toolbarOptions
                }
            });

            quillRef.current.on('text-change', () => {
                setDescription(quillRef.current.root.innerHTML);
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log({
            title,
            location,
            category,
            level,
            salary,
            description
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-xl shadow">
            <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input onChange={e => setTitle(e.target.value)} value={title} type="text" placeholder="Type here" required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200" />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Job Description</label>
                <div className="h-64 mb-4">
                    <div ref={editorRef} className="h-full"></div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Job Category</label>
                    <select 
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        {JobCategories.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Job Location</label>
                    <select 
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        {JobLocations.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Job Level</label>
                    <select 
                        value={level}
                        onChange={e => setLevel(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Salary</label>
                <input 
                    type="number" 
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                    placeholder="0" 
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200" 
                />
            </div>

            <button type="submit" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">ADD</button>
        </form>
    )
}

export default AddJob