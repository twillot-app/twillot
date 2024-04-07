import Spinner from './Spinner'

export default function Indicator({ text }: { text: string }) {
  return (
    <div class="w-full flex flex-col items-center justify-center">
      <Spinner />
      <p class="text-blue-500 mt-4 text-lg">{text}</p>
    </div>
  )
}
