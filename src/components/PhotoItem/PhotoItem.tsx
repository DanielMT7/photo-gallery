import { PhotoProps } from '../../types/Photo'

import styles from './PhotoItem.module.css'

type ExtendedPhotoProps = PhotoProps & {
  handleDelete: (key: string) => void
}

const PhotoItem = ({ name, url, handleDelete }: ExtendedPhotoProps) => {
  return (
    <div className={styles.container}>
      <img src={url} alt={name} />
      <div className={styles.info}>
        <p>{name}</p>
        <button onClick={() => handleDelete(name)}>Deletar 🗑️</button>
      </div>
    </div>
  )
}

export default PhotoItem
