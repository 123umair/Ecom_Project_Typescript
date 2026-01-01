import { useState, useEffect } from "react";

interface Author {
  name: string;

  isFollowing: boolean;

  image: string;
}

export const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData =  () => {
    //   try {
    //     const response = await fetch("https://randomuser.me/api/?results=5");
    //     const data = await response.json();
    //     console.log(data, "usersdata");
    //     const authorsData: Author[] = data.results.map((user: any) => ({
    //       name: `${user.name.first} ${user.name.last}`,
    //       isFollowing: false,
    //       image: user.picture.medium,
    //     }));
    const dummyAuthors: Author[] = [
        { name: "John Doe", isFollowing: false, image: "https://randomuser.me/api/portraits/men/1.jpg" },
        { name: "Jane Smith", isFollowing: false, image: "https://randomuser.me/api/portraits/women/2.jpg" },
        { name: "Mike Johnson", isFollowing: false, image: "https://randomuser.me/api/portraits/men/3.jpg" },
        { name: "Emma Watson", isFollowing: false, image: "https://randomuser.me/api/portraits/women/4.jpg" },
        { name: "Chris Evans", isFollowing: false, image: "https://randomuser.me/api/portraits/men/5.jpg" }
      ]
      
      setAuthors(dummyAuthors)
      
        // setAuthors(authorsData);
    //   } catch (error) {
    //     console.error(`Error fetching authors: ${error}`);
    //   }
    };

    fetchData(); // <-- call fetch here, NOT in return
  }, []); // <-- empty dependency array, so runs once

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthor) =>
      prevAuthor.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div className="bg-white p-5 ml-5 mt-4 border md:w-92 rounded ">
      <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

      <ul>
        {authors.map((author, index) => (
          <li key={index} className="flex items-center justify-between mb-4 flex-col gap-2 p-4 md:flex-row">
            <section className="flex flex-col md:flex-row justify-center items-center">
              <img
                src={author.image}
                alt={author.name}
                className="w-[25%] h-[25%] justify-center rounded-full"
              />

              <span className="ml-4"> {author.name} </span>
            </section>

           
           <button
              className={`py-1 px-3 rounded   ${
                author.isFollowing
                  ? "bg-red-500 text-white"
                  : "bg-black text-white"
              }`}
              onClick={() => handleFollowClick(index)}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
           
           
           
          </li>
        ))}
      </ul>
    </div>
  );
};
