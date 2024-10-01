import { IconSparkles } from './Icons'

export default function ModalContentAIFeature() {
  return (
    <>
      <p class="flex items-center gap-2">
        Click the <IconSparkles /> icon next to the Folders menu on the left.
      </p>

      <ul class="list-disc pl-5">
        <li>Free Plan: 0 tweets/day</li>
        <li>Basic Plan: 200 tweets/day</li>
        <li>Pro Plan: 500 tweets/day</li>
      </ul>
      <p>Upgrade to Pro Plan for the best experience!</p>
    </>
  )
}
