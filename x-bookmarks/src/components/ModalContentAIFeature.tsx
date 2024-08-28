import { IconSparkles } from './Icons'

export default function ModalContentAIFeature() {
  return (
    <>
      <p>
        We now offer AI-powered smart categorization to automatically organize
        your bookmarks!
      </p>
      <p class="flex items-center gap-2">
        To use this feature, simply click the <IconSparkles /> icon next to the
        Folders menu on the left.
      </p>

      <ul class="list-disc pl-5">
        <li>Free Plan: 20 tweets/day, standard language model</li>
        <li>Basic Plan: 200 tweets/day, advanced language model</li>
        <li>Pro Plan: 500 tweets/day, advanced language model</li>
      </ul>
      <p>Upgrade to Pro Plan for the best experience!</p>
    </>
  )
}
