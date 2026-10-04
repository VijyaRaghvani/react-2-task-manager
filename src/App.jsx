import { useState, useEffect } from 'react'
export default function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks') || '[]'))
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')
  useEffect(() => localStorage.setItem('tasks', JSON.stringify(tasks)), [tasks])
  const add = () => { if (!text.trim()) return; setTasks([...tasks, { id: Date.now(), text, done: false }]); setText('') }
  const toggle = id => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const remove = id => setTasks(tasks.filter(t => t.id !== id))
  const shown = tasks.filter(t => filter === 'all' || (filter === 'done') === t.done)
  return (
    <div className="box">
      <h1>Task Manager</h1>
      <div className="row">
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="New task..." />
        <button onClick={add}>Add</button>
      </div>
      <div className="row">{['all', 'pending', 'done'].map(f => (
        <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>))}</div>
      <ul>{shown.map(t => (
        <li key={t.id}>
          <label className={t.done ? 'done' : ''}><input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} /> {t.text}</label>
          <button onClick={() => remove(t.id)}>✕</button>
        </li>))}</ul>
    </div>
  )
}
