import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

function App() {
    const [noCount, setNoCount] = useState(0)
    const [yesPressed, setYesPressed] = useState(false)
    const yesButtonSize = noCount * 20 + 16

    useEffect(() => {
        if (yesPressed) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            })
        }
    }, [yesPressed])

    const handleNoClick = () => {
        setNoCount(noCount + 1)
    }

    const getNoButtonText = () => {
        const phrases = [
            "No",
            "Are you sure?",
            "Really sure?",
            "Think again!",
            "Last chance!",
            "Surely not?",
            "You might regret this!",
            "Give it another thought!",
            "Are you absolutely certain?",
            "This could be a mistake!",
            "Have a heart!",
            "Don't be so cold!",
            "Change of heart?",
            "I wouldn't say no!",
            "What about a second chance?",
            "Please?",
        ]
        return phrases[Math.min(noCount, phrases.length - 1)]
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen -mt-16">
            {yesPressed ? (
                <>
                    <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="bears kissing" />
                    <div className="text-4xl font-bold my-4 text-center">Yay!!! Happy Valentine's Day!! ❤️</div>
                </>
            ) : (
                <>
                    <img className="h-[200px]" src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif" alt="bear with roses" />
                    <h1 className="text-4xl font-bold my-4 text-center">Will you be my Valentine?</h1>
                    <div className="flex flex-wrap flex-col md:flex-row gap-4 items-center justify-center">
                        <button
                            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
                            style={{ fontSize: yesButtonSize }}
                            onClick={() => setYesPressed(true)}
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleNoClick}
                            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {noCount === 0 ? "No" : getNoButtonText()}
                        </button>
                    </div>
                </>
            )}

            {/* Floating hearts background elements */}
            <div className="floating-heart" style={{ left: '10%', animationDelay: '0s' }}>❤️</div>
            <div className="floating-heart" style={{ left: '30%', animationDelay: '2s' }}>💖</div>
            <div className="floating-heart" style={{ left: '70%', animationDelay: '4s' }}>❤️</div>
            <div className="floating-heart" style={{ left: '90%', animationDelay: '1s' }}>💕</div>
        </div>
    )
}

export default App
