
'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: number
  text: string
  completed: boolean
}

export function MindfulTasksList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "10 minutes of deep breathing", completed: false },
    { id: 2, text: "Take a short walk outside", completed: false },
    { id: 3, text: "Practice gratitude journaling", completed: false },
  ])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mindful Tasks for Today</CardTitle>
        <CardDescription>Add and complete tasks to lower your stress levels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new mindful task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask}><Plus className="h-4 w-4" /></Button>
        </div>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center space-x-2">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`flex-grow ${task.completed ? 'line-through text-muted-foreground' : ''}`}
              >
                {task.text}
              </label>
              <Button variant="ghost" size="sm" onClick={() => removeTask(task.id)}>
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

