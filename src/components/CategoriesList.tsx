import { FormEvent, useState } from 'react'
import { v4 as uuid } from "uuid";
import useFetch from '../hooks/useFetch';
import Category from '../models/Category'

type Props = {}
const apiUrl = 'http://localhost:3001'

const CategoriesLis = (props: Props) => {
const [name, setName] = useState<string>('');
const [categories, setCategories] = useState<Category[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(`${apiUrl}/categories`)
  //     const data = await res.json()

  //     setCategories(data)
  //   })()
  // }, [])

  useFetch<Category>({ 
    url: `${apiUrl}/categories`,
    callbackFetch: (data) => setCategories(data)
  })

  const handleAddCategory = (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()

    const category: Category = { id: uuid(), name };

    (async(data) => {
      
      try {
        
        await fetch(`${apiUrl}/categories`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        //setCategories((state) => [...state, data])

        clearState()

      } catch(err) {
        console.log(err)
      }
    })(category)
  }

  const clearState = () => setName('');

  return (
    <div>
      <h5>Categories</h5>
      <div>
        <form onSubmit={handleAddCategory}>
          Category Name: <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }}/>
          <br />
          <input type="submit" value="Add Category" />
        </form>
      </div>
      <ul>
        {categories && categories.map((c, i) => ( 
          <li key={c.id}>{i+1} - {c.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default CategoriesLis