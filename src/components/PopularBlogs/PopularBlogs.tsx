import { MessageCircle, ThumbsUp } from 'lucide-react'



export const PopularBlogs = () => {
    const blogs = [
    {
    title:"My Amazing Blog Title 1",

    author:"John",

    likes : 142,

    comments: 44

    },
    {
    title:"My Amazing Blog Title 2",

    author:"Doe",

    likes : 148,

    comments: 84

    },
    {
    title:"My Amazing Blog Title 3",

    author:"Umair",

    likes : 368,

    comments: 410

    }]
  return (
    <div
    className='bg-white p-5 md:w-92 mt-4 border ml-5 rounded '>
    
    <h2 className='text-xl font-bold mb-5'>
        Popular Blogs

    </h2>
<ul>
    {blogs.map((blog, index) => (
        
        <li key={index} className='mb-4'>
                <div className="flex justify-between items-center ">

                    <span className='font-bold mb-2'>

                        {
                            blog.title
                        }

                    </span>
                </div>

                <span className="text-gray-600">Published by {blog.author}</span>
                <div className='flex items-center mt-2 '>
                    <MessageCircle size={16}/>

                    <span className='test-gray-500 mr-5 ml-1 '> {blog.likes} </span>

                    <ThumbsUp size={16} />

                    <span className='text-gray-500 mr-2 ml-2'>
                        {blog.comments}

                    </span>
                </div>
        </li>
    ))}
</ul>

    </div>
  )
}
