import React from 'react'

const SearchBar = ({search, setSearch}) => {
  return (
    <input 
    className='search-bar'
    type='text'
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder='🔍 Search expenses...'
    />
  )
}

export default SearchBar
