export default function ProjectCapsule({ title, imageUrl }) {
  return (
    <div>
      <h3>{title}</h3>
      <img src={`/images/${title}`} />
    </div>
  );
}
