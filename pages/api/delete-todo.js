import { authorize } from "../../src/authorize";
import { getXataClient } from "../../src/xata";

const handler = async (req, res) => {
  const { isAuthenticated, username } = await authorize(req);
  if (!isAuthenticated) {
    res.status(401).end();
    return;
  }
  const { id } = req.body;
  await getXataClient().db.items.delete(id);
  res.end();
};

export default handler;
