interface Params {
  params: {
    id: string;
  };
}

// app/parents/[id]/page.tsx
import Image from "next/image";

interface Params {
  params: {
    id: string;
  };
}

export default async function ParentPage({ params }: Params) {
  const res = await fetch(`https://summer-bootcamp-apis.onrender.com/api/parents/${params.id}`);
  const data = await res.json();
  const parent = data.parent;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Parent Information</h1>
        <div className="flex items-center space-x-4">
          <Image src={parent.image} alt="Parent" width={80} height={80} className="rounded-full" />
          <div>
            <p className="font-semibold">{parent.name}</p>
            <p className="text-gray-600">{parent.phoneNumber}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Authorized Third-Party</h2>
        <div className="flex items-center space-x-4">
          <Image src={parent.thirdpartyImage} alt="Third Party" width={80} height={80} className="rounded-full" />
          <div>
            <p className="font-semibold">{parent.thirdpartyName}</p>
            <p className="text-gray-600">{parent.thirdpartyPhoneNumber}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Children</h2>
        <div className="space-y-4">
          {parent.children.map((child: any, index: number) => (
            <div key={child._id} className="border rounded-lg p-4 flex space-x-4 items-center">
              <Image src={child.image} alt={child.name} width={80} height={80} className="rounded-md" />
              <div>
                <p className="font-semibold">{child.name}</p>
                <p>Class: {child.class}</p>
                <p>Age: {child.age}</p>
                <p>School: {child.schoolAttended}</p>
                <p>Bootcamp Course: {child.bootcampCourse}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
