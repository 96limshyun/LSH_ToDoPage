export const DEFAULT_POSITION = -1;
export const POSITION_INCREMENT = 1;
export const FIRST_ROW = 0;

export const OK_BUTTON_TEXT = {
    CREATE: "Create",
    EDIT: "Edit"
} as const

export const INPUT_NAME = {
    DASHBOARD: "name",
    TASK: "content"
} as const

export const ERROR_MESSAGES = {
    NAME_REQUIRED: "이름이 필요합니다.",
    EMPTY_NAME: "이름을 입력해주세요.",
    CREATE_FAIL: "생성에 실패했습니다.",
    CREATE_FAIL_RETRY: "생성에 실패 했습니다. 다시 시도 해주세요.",
    EDIT_FAIL: "수정이 실패했습니다.",
    EDIT_FAIL_RETRY: "수정이 실패 했습니다. 다시 시도 해주세요.",
    GET_FAIL: "불러오기에 실패했습니다.",
};

export const DATABASE_ERROR_MESSAGES = {
    GET_FAIL: "데이터를 불러오는 데 실패했습니다.",
};


export const SUCCESS_MESSAGES = {
    DASHBOARD_CREATED: "대시보드가 성공적으로 생성되었습니다.",
};

export const FORM_CARD_TITLES = {
    CREATE_DASHBOARD: "Create Dashboard",
    EDIT_DASHBOARD: "Edit Dashboard",
    CREATE_TASK: "Create Task",
    EDIT_TASK: "Edit Task",
};

export const HOME_PATH = "/";