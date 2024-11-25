'use dom'

export default function DOMComponent({ name }: { name: string }) {
  return (
    <div>
      <p>Hello, {name}</p>
    </div>
  )
}
