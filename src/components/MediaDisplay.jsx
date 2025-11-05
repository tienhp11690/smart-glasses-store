const MediaDisplay = ({ src, alt, className = '' }) => {
  if (!src) {
    return (
      <div className={`bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center ${className}`}>
        <p className="text-gray-500 text-xs text-center px-2">No media</p>
      </div>
    )
  }

  const extension = src.split('.').pop()?.toLowerCase()
  
  // Handle video files
  if (extension === 'mp4' || extension === 'webm' || extension === 'mov') {
    return (
      <video
        src={src}
        alt={alt}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => {
          console.error('Error loading video:', src)
          e.target.style.display = 'none'
        }}
      />
    )
  }
  
  // Handle GIF files
  if (extension === 'gif') {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onError={(e) => {
          console.error('Error loading image:', src)
          e.target.style.display = 'none'
        }}
      />
    )
  }
  
  // Handle regular image files (jpg, jpeg, png, webp, svg)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        console.error('Error loading image:', src)
        e.target.style.display = 'none'
      }}
    />
  )
}

export default MediaDisplay

