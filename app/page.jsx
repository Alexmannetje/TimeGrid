import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto flex justify-between">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-16 flex-1">
          <div className="h-32 rounded-lg bg-gray-200">profile</div>
          <div className="h-32 rounded-lg bg-gray-200">calender</div>
          <div className="h-32 rounded-lg bg-gray-200">settings</div>
          <div className="h-32 rounded-lg bg-gray-200">contact</div>
        </div>
        <div className="flex-1">Hey</div>
      </div>
    </div>
  );
}
