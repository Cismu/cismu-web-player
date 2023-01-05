import styles from "../styles.module.css";

export default function Options() {
  return (
    <div className="grid auto-cols-auto grid-flow-col gap-x-8">
      <button>
        <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 16 16">
          <path d="M9 5H4a3 3 0 0 0 0 6h1.2v1H4a4 4 0 0 1 0-8h1V2l4 3zm3 6a3 3 0 0 0 0-6h-1.2V4H12a4 4 0 0 1 0 8h-1v2l-4-3h5z"></path>
        </svg>
      </button>
      <button>
        <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 16 16">
          <path d="m16 5-4-3v2h-2v1h6zm-12.553.007c.377-.015 1.169-.044 1.935.231.434.156.83.403 1.12.787.285.38.498.938.498 1.774 0 1.009.248 1.805.673 2.422.423.614.996 1.013 1.59 1.272.976.426 2.054.492 2.737.502V14l4-3h-2v-.003h-1.647c-.627 0-1.74-.005-2.69-.42-.465-.203-.873-.497-1.167-.924C8.204 9.23 8 8.64 8 7.8c0-1.014-.262-1.793-.7-2.375-.435-.579-1.013-.923-1.58-1.127-.982-.353-2.02-.304-2.34-.29-.04.003-.07.004-.086.004H0v1h3.294l.153-.004zM5 12H0v-1h5v1z"></path>
        </svg>
      </button>
      <button>
        <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 16 16">
          <path d="M5.894 9.8H2V6.2h3.894L9 3.301V12.7L5.894 9.8zM1 10.8h4.5L10 15V1L5.5 5.2H1v5.6zm14-3.145a5.117 5.117 0 0 1-1.504 3.63l-.687-.728A4.118 4.118 0 0 0 14 7.655a4.116 4.116 0 0 0-1.013-2.71l.708-.708A5.112 5.112 0 0 1 15 7.655zm-2.094.108c0 .784-.33 1.49-.857 1.99l-.687-.727a1.734 1.734 0 0 0 .036-2.491l.707-.707a2.73 2.73 0 0 1 .801 1.935z"></path>
        </svg>
      </button>
      <button>
        <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 16 16">
          <path d="M5.937 4a2 2 0 0 1-3.874 0H0V3h2.063a2 2 0 0 1 3.874 0H16v1H5.937zM5 3.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm.937 9.5H16v1H5.937a2 2 0 0 1-3.874 0H0v-1h2.063a2 2 0 0 1 3.874 0zM5 13.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0zM13.937 8H16v1h-2.063a2 2 0 0 1-3.874 0H0V8h10.063a2 2 0 0 1 3.874 0zM13 8.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"></path>
        </svg>
      </button>
      <div className={`${styles.divider}`}></div>
      <button>Playlist</button>
    </div>
  );
}
