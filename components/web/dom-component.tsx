'use dom'

export default function DOMComponent({
  name,
}: {
  name: string
  dom: import('expo/dom').DOMProps
}) {
  return (
    <div>
      <h3>
        this is web component with <code>use dom</code>
      </h3>
      <p>Hello, {name}</p>
    </div>
  )
}
