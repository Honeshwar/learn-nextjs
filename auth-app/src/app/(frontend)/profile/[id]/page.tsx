
export default function UserProfilePage({params}:{params:{id:string}}) {
  return (
    <div>
      <h1>Profile <span className="text-blue-500">{params.id}</span></h1>
    </div>
  )
}