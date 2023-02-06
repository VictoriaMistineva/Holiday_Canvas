const sendAE = (act: any, stf: any) => {
  console.log(act, stf)
  // @ts-ignore
  window.evg_assistant.sendData({ action: { action_id: act, parameters: stf }});
};

export {sendAE};
