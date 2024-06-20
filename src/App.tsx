import { useEffect, useState, FormEvent, useRef } from 'react'

import Loading from './components/Loading/Loading'
import PhotoItem from './components/PhotoItem/PhotoItem'

import * as Photos from './services/photos'

import { PhotoProps } from './types/Photo'

import styles from './App.module.css'

const App = () => {
  const [uploading, setUpLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<PhotoProps[]>([])
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true)

      setPhotos(await Photos.getAll())

      setLoading(false)
    }

    getPhotos()
  }, [])

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const file = formData.get('image') as File

    if (file && file.size > 0) {
      setSubmitting(true)
      setUpLoading(true)

      let result = await Photos.insert(file)

      setSubmitting(false)
      setUpLoading(false)

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`)
      } else {
        let newPhotoList = [...photos]
        newPhotoList.push(result)
        setPhotos(newPhotoList)
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (key: string) => {
    if (key.length > 0) {
      const message = await Photos.deleteImage(key)
      alert(`${message}`)

      let newPhotoList = photos.filter(photo => photo.name !== key)
      setPhotos(newPhotoList)
    }

    return
  }

  return (
    <div className={styles.app}>
      <div className={styles.area}>
        <h1>Galeria de Fotos</h1>
        {/* Area de upload*/}

        <form className={styles.form} method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" ref={fileInputRef} />
          <input type="submit" value="Enviar" disabled={submitting} />
          {uploading && 'Enviando...'}
        </form>

        {loading && <Loading />}

        {!loading && photos.length > 0 && (
          <div className={styles.photo_list}>
            {photos.map((item, index) => {
              const { name, url } = item
              return (
                <PhotoItem
                  key={index}
                  name={name}
                  url={url}
                  handleDelete={handleDelete}
                />
              )
            })}
          </div>
        )}

        {!loading && photos.length === 0 && (
          <div>
            <p>Não há fotos cadastradas.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
