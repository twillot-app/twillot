import Spinner from './Spinner'

export default function Indicator(props: { text: string }) {
  return (
    <div class="w-full flex flex-col items-center justify-center my-4">
      <Spinner />
      <p class="text-blue-500 mt-4 text-lg">{props.text}</p>
    </div>
  )
}
