// This file is intentionally empty as the nextEvents function was unused

export function nextEvents(userId: string): Promise<object> {
  console.log(userId);
  return Promise.resolve({});
}
