import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.container}>
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="#537895"
            />
          </filter>
        </defs>
        <circle
          className={styles.spinner}
          style={{
            fill: 'transparent',
            stroke: '#00308F',
            strokeWidth: '4px',
            strokeLinecap: 'round',
            filter: 'url(#shadow)'
          }}
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
  )
}

export default Loading
