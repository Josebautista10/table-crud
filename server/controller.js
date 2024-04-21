const dtpoeModel = require('./Model');

const getAllDtpoeData = async (req, res) => {
  try {
    const data = await dtpoeModel.getAllDtpoeData();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateDtpoeData = async (req, res) => {
  const iddpo = req.params.id;
  const { nobj, nocon, idarea } = req.body;

  try {
    const updatedRow = await dtpoeModel.updateDtpoeData(iddpo, nobj, nocon, idarea);
    res.json(updatedRow);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteDtpoeData = async (req, res) => {
  const id = req.params.id;

  try {
    const isDeleted = await dtpoeModel.deleteDtpoeData(id);
    if (isDeleted) {
      res.json({ message: 'Row deleted successfully' });
    } else {
      res.status(404).json({ error: 'Row not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createDtpoeData = async (req, res) => {
  const { nobj, nocon, idarea } = req.body;

  try {
    const newRow = await dtpoeModel.createDtpoeData(nobj, nocon, idarea);
    res.json(newRow);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllDtpoeData,
  updateDtpoeData,
  deleteDtpoeData,
  createDtpoeData
};
