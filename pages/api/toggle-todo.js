import { authorize } from "../../src/authorize";
import { getXataClient } from "../../src/xata";

const handler = async (req, res) => {
  const { isAuthenticated } = await authorize(req);
  if (!isAuthenticated) {
    res.status(401).end();
    return;
  }
  const { id, is_done } = req.body;
  const xata = getXataClient();
  await xata.db.items.update({ id, is_done });
  res.end();
};

export default handler;
