import { useEffect } from 'react'

export default function VideoModal({
  isOpen,
  title,
  src,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Video'}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Kapat">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {hasPrev ? (
            <button
              type="button"
              className="modal-nav modal-prev"
              onClick={onPrev}
              aria-label="Önceki video"
            >
              ‹
            </button>
          ) : null}
          <video className="modal-video" src={src} controls autoPlay muted playsInline />
          {hasNext ? (
            <button
              type="button"
              className="modal-nav modal-next"
              onClick={onNext}
              aria-label="Sonraki video"
            >
              ›
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}


