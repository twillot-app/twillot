export enum OptionName {
  FOLDER = 'folder',
  RULE = 'rule',
  WORKFLOW = 'workflow',
  // 自动回复模板
  COMMENT_TEMPLATE = 'comment_template',
  SIGNATURE_TEMPLATE = 'signature_template',
}

export enum OptionStoreField {
  COMMENT_TEMPLATE = 'templates',
  SIGNATURE_TEMPLATE = 'signatures',
}

export interface Config {
  id: string
  owner_id: string
  updated_at: number
  option_name: OptionName
  option_value: any
}
