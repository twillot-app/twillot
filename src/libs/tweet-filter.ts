import { Tweet } from '../types'

export type ConditionType = 'contains' | 'notContains' | 'length'

export interface Condition {
  type: ConditionType
  value: any
}

export interface Rule {
  conditions: Condition[]
  folderName: string
}

class TweetFilter {
  private rules: Rule[] = []

  constructor(rules: Rule[]) {
    this.rules = rules
  }

  public addRule(rule: Rule): void {
    this.rules.push(rule)
  }

  private matchesCondition(tweet: Tweet, condition: Condition): boolean {
    switch (condition.type) {
      case 'contains':
        return tweet.full_text.includes(condition.value)
      case 'notContains':
        return !tweet.full_text.includes(condition.value)
      case 'length':
        const [min, max] = condition.value
        return tweet.full_text.length >= min && tweet.full_text.length <= max
      default:
        return false
    }
  }

  public applyFilters(tweets: Tweet[]): Tweet[] {
    return tweets.map((tweet) => {
      this.rules.forEach((rule) => {
        const matchesAll = rule.conditions.every((condition) =>
          this.matchesCondition(tweet, condition),
        )
        if (matchesAll) {
          tweet.folder = rule.folderName
        }
      })
      return tweet
    })
  }
}

export default TweetFilter
