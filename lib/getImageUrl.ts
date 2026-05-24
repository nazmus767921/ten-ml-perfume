// const urls = [
//   "https://images.unsplash.com/photo-1593487568720-92097fb460fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1588514912908-8f5891714f8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1705338670422-01133208eab9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1595425959632-34f2822322ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1599342166997-58552e91d9f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1700522360590-a913ff2a3d9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1611242956059-53e4c29e6b22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1624811742200-69166e7b7bcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1615160460524-432433ba1b8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxwZXJmdW1lfGVufDB8fDB8fHww",
//   "https://images.unsplash.com/photo-1698793916137-30f994d15133?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxwZXJmdW1lfGVufDB8fDB8fHww",
//   "https://images.unsplash.com/photo-1723391962090-f17948c190ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxwZXJmdW1lfGVufDB8fDB8fHww",
//   "https://images.unsplash.com/photo-1681935703733-5e9df028a318?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHxwZXJmdW1lfGVufDB8fDB8fHww",
// ]

// export const getImageUrl = () => {
//   const index = Math.floor(Math.random() * urls.length)
//   const url = urls[index]
//   urls.splice(index, 1)
//   return url
// }

const urls = [
  "https://images.unsplash.com/photo-1593487568720-92097fb460fb?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1588514912908-8f5891714f8d?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1705338670422-01133208eab9?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1595425959632-34f2822322ce?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1599342166997-58552e91d9f5?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1700522360590-a913ff2a3d9f?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1611242956059-53e4c29e6b22?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1624811742200-69166e7b7bcc?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1615160460524-432433ba1b8f?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1698793916137-30f994d15133?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1723391962090-f17948c190ec?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1681935703733-5e9df028a318?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1619603036495-927702677941?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1626447814833-2898950d4d12?w=500&auto=format&fit=crop&q=60",
]

// Helper to keep track of used images to ensure no duplicates in your mock data
let currentIndex = 0
export const getImageUrl = () => {
  const url = urls[currentIndex]
  currentIndex = (currentIndex + 1) % urls.length
  return url
}
