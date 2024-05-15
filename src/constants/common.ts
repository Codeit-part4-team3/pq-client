export const LOCAL_STORAGE_ALRAM_KEY = 'pq-alram';

/**
 * @socket method
 */
export const SOCKET_ON = {
  /**
   * chat
   */
  JOIN_CHAT_CHANNEL_USER_JOIN: 'join_chat_channel_user_join',
  INITIAL_CHAT_MESSAGES: 'initial_chat_messages',
  RECEIVE_MESSAGE: 'receive_message',
  UPDATE_MESSAGE_COMPLETE: 'update_message_complete',
  DELETE_MESSAGE: 'delete_message',
  MORE_MESSAGES: 'more_messages',

  /**
   * voice
   */
  PARTICIPANTS_LIST: 'participants_list',
  GET_OFFER: 'get_offer',
  GET_ANSWER: 'get_answer',
  GET_CANDIDATE: 'get_candidate',
  VIDEO_TRACK_ENABLED_CHANGED: 'video_track_enabled_changed',
  USER_EXIT: 'user_exit',
  UPDATE_MEETING_NOTE: 'update_meeting_note',
};

/**
 * @socket method
 */
export const SOCKET_EMIT = {
  /**
   * chat
   */
  SEND_MESSAGE: 'send_message',
  UPDATE_MESSAGE_EDITING: 'update_message_editing',
  UPDATE_MESSAGE_COMPLETE: 'update_message_complete',
  UPDATE_MESSAGE_CANCEL: 'update_message_cancel',
  DELETE_MESSAGE: 'delete_message',
  MORE_MESSAGES: 'more_messages',
  JOIN_CHAT_CHANNEL: 'join_chat_channel',

  /**
   * vocie
   */
  VIDEO_TRACK_ENABLED_CHANGED: 'video_track_enabled_changed',
  JOIN_VOICE_CHANNEL: 'join_voice_channel',
  CANDIDATE: 'candidate',
  ANSWER: 'answer',
  START_MEETING_NOTE: 'start_meeting_note',
  END_MEETING_NOTE: 'end_meeting_note',
  GET_MEETING_NOTE_LIST: 'get_meeting_note_list',
  UPDATE_MEETING_NOTE: 'update_meeting_note',

  /**
   * common
   */
  JOIN: 'join',
};

export const SOCKET_COMMON = {
  READ_MESSAGE: 'read_message',
};
