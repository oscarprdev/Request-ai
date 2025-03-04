export interface Rule {
  id: number;
  priority: number;
  condition: {
    urlFilter: string;
    resourceTypes: chrome.declarativeNetRequest.ResourceType[];
    requestMethods?: chrome.declarativeNetRequest.RequestMethod[];
    domains?: string[];
    excludedDomains?: string[];
  };
  action: {
    type: chrome.declarativeNetRequest.RuleActionType;
    redirect?: {
      url?: string;
      transform?: {
        scheme?: string;
        host?: string;
        path?: string;
        queryTransform?: {
          removeParams?: string[];
          addOrReplaceParams?: { key: string; value: string }[];
        };
      };
    };
    requestHeaders?: chrome.declarativeNetRequest.ModifyHeaderInfo[];
    responseHeaders?: chrome.declarativeNetRequest.ModifyHeaderInfo[];
  };
}

export interface ServerRule {
  id: number;
  priority: number;
  urlFilter: string;
  resourceTypes: string[];
  requestMethods: string[];
  actionType: string;
  redirectUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type RuleCreateDTO = Omit<Rule, 'id' | 'createdAt' | 'updatedAt'>;
export type RuleUpdateDTO = Partial<Omit<Rule, 'id' | 'createdAt' | 'updatedAt'>>;
