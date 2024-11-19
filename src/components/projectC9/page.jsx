'use client'

import { useState } from 'react'
import { Plus, Trash2, Calendar } from 'lucide-react'
import './style.css'
import img from './no-projects.png'
export default function ProjectC9() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Learning React',
      date: 'Dec 29, 2024',
      dueDate: '2024-12-29',
      description: 'Learn React from the ground up.',
      tasks: [
        'Practice, practice, practice!',
        'Learn advanced concepts',
        'Learn the basics'
      ]
    }
  ])
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [newTask, setNewTask] = useState('')
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    dueDate: ''
  })
  const [isAddingProject, setIsAddingProject] = useState(false)

  const addTask = (e) => {
    e.preventDefault()
    if (newTask.trim() && selectedProject) {
      const updatedProjects = projects.map(project => 
        project.id === selectedProject.id 
          ? { ...project, tasks: [newTask, ...project.tasks] }
          : project
      )
      setProjects(updatedProjects)
      setSelectedProject(prevProject => prevProject ? { ...prevProject, tasks: [newTask, ...prevProject.tasks] } : null)
      setNewTask('')
    }
  }

  const clearTask = (index) => {
    if (selectedProject) {
      const updatedProjects = projects.map(project => 
        project.id === selectedProject.id 
          ? { ...project, tasks: project.tasks.filter((_, i) => i !== index) }
          : project
      )
      setProjects(updatedProjects)
      setSelectedProject(prevProject => prevProject ? {
        ...prevProject,
        tasks: prevProject.tasks.filter((_, i) => i !== index)
      } : null)
    }
  }

  const addProject = () => {
    if (newProject.title.trim()) {
      const project = {
        id: Date.now(),
        name: newProject.title,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        dueDate: newProject.dueDate,
        description: newProject.description,
        tasks: []
      }
      setProjects([...projects, project])
      setNewProject({ title: '', description: '', dueDate: '' })
      setIsAddingProject(false)
      setSelectedProject(project)
    }
  }

  const deleteProject = () => {
    if (selectedProject) {
      const updatedProjects = projects.filter(project => project.id !== selectedProject.id)
      setProjects(updatedProjects)
      setSelectedProject(updatedProjects[0] || null)
    }
  }

  return (
    <div className='all-[unset] 'style={{all:'unset'}}>
    <div className="isolation-auto project-c9 flex min-h-screen bg-gray-100" >
      {/* Sidebar */}
      <div className="w-64 bg-stone-900 p-6 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-4">YOUR PROJECTS</h2>
        <button 
          className="w-full mb-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-900 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
          onClick={() => {
            setIsAddingProject(true)
            setSelectedProject(null)
          }}
        >
          <Plus className="inline-block h-4 w-4 mr-2" />
          Add Project
        </button>
        <nav className="space-y-2 flex-column">
          {projects.map(project => (
            <a
              key={project.id}
              href="#"
              className={`block px-3 py-2 text-sm rounded-md hover:text-stone-700 text-stone-700 ${
                selectedProject?.id === project.id ? 'bg-stone-100 text-stone-700' : 'text-stone-100 bg-stone-900'
              }`}
              onClick={() => {
                setSelectedProject(project)
                setIsAddingProject(false)
              }}
            >
              {project.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl">
          {isAddingProject ? (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">TITLE</label>
                  <input
                    id="title"
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="mt-1 text-black block w-full rounded-md border-gray-900 shadow-sm focus:border-stone-300 focus:ring focus:ring-stone-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">DESCRIPTION</label>
                  <textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="mt-1 text-black block w-full rounded-md border-gray-900 shadow-sm focus:border-stone-300 focus:ring focus:ring-stone-200 focus:ring-opacity-50"
                    rows={3}
                  />
                </div>
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">DUE DATE</label>
                  <div className="relative mt-1">
                    <input
                      id="dueDate"
                      type="date"
                      value={newProject.dueDate}
                      onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                      className="block w-full rounded-md border-gray-900 shadow-sm focus:border-stone-300 focus:ring focus:ring-stone-200 focus:ring-opacity-50"
                      placeholder="dd.mm.yyyy"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setIsAddingProject(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-900 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
                >
                  Cancel
                </button>
                <button
                  onClick={addProject}
                  className="px-4 py-2 text-sm font-medium text-white bg-stone-600 border border-transparent rounded-md shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
                >
                  Save
                </button>
              </div>
            </div>
          ) : selectedProject ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{selectedProject.name}</h1>
                  <p className="text-gray-600 mb-1">Created: {selectedProject.date}</p>
                  <p className="text-gray-600 mb-2">Due: {new Date(selectedProject.dueDate).toLocaleDateString()}</p>
                  <p className="text-lg mb-2">{selectedProject.description}</p>
                </div>
                <button
                  onClick={deleteProject}
                  className="px-3 py-2 text-sm font-medium text-red-700 hover:bg-stone-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                <form onSubmit={addTask} className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add Task"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="flex-1 rounded-md border-gray-900 shadow-sm focus:border-stone-300 focus:ring focus:ring-stone-200 focus:ring-opacity-50"
                    />
                    <button
                      type="submit"
                      className=" px-4 py-2 text-sm font-medium text-white bg-stone-600 border border-transparent rounded-md shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
                    style={{background:'black'}}>
                      Add Task
                    </button>
                  </div>
                </form>

                <ul className="space-y-3">
                  {selectedProject.tasks.map((task, index) => (
                    <li key={index} className="flex items-center justify-between group">
                      <span className='text-black'>{task}</span>
                      <button
                        onClick={() => clearTask(index)}
                        className="px-2  bg-white text-black py-1 text-sm text-gray-600 hover:text-red-600 rounded  group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Clear
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <><img className='text-center' style={{textAlign:'center'}} src={img} alt="img" width={100} height={100}></img><div className="text-center text-gray-500">

                  Select a project or add a new one to get started.
                </div>
                
                <button
                  onClick={addProject}
                  className="px-4 py-2 text-sm font-medium text-white bg-black-00 border border-transparent rounded-md shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
                >
                  add 
                </button>
                </>
          )}
        </div>
      </div>
    </div>
    </div>
  )}