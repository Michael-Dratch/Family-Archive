import ArchiveCard from "@/components/archivecard";
import CreateArchiveCard from "@/components/createarchivecard";
import PrimaryButton from "@/components/primarybutton";

export default function Home() {
  const archives = [
    { imgUrl: "/images/gettyimages1.jpg", title: "Dratch Family Archive" },
    { imgUrl: "/images/gettyimages2.jpg", title: "Sisenwine Family Archive" },
  ];
  return (
    <div className="p-4">
      <section>
        <div className="flex justify-between">
          <h1 className="text-lg font-black text-gray-800">My Archives</h1>
          <span className="hidden sm:block">
            <PrimaryButton
              url="/create-archive"
              text="Create Archive"
            ></PrimaryButton>
          </span>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center pt-4">
          {archives.map((item, index) => {
            return <ArchiveCard key={index} data={item}></ArchiveCard>;
          })}
          <CreateArchiveCard></CreateArchiveCard>
        </div>
      </section>
    </div>
  );
}
