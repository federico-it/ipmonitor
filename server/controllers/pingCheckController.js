const PingCheck = require('../models/pingCheck');
const PingCheckStatus = require('../models/pingCheckStatus');
const ping = require('ping');
const cron = require('node-cron');


const createPingCheck = async (req, res) => {
  const { ipAddress, interval } = req.body;
  const user = req.user._id;

  try {
    const pingCheck = await PingCheck.create({ user, ipAddress, interval });
    res.status(201).json({ message: 'Ping check created', pingCheck });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getPingChecks = async (req, res) => {
  const user = req.user._id;

  try {
    const pingChecks = await PingCheck.find({ user });
    res.status(200).json({ pingChecks });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const checkPing = async (pingCheck) => {
  const { ipAddress } = pingCheck;
  const res = await ping.promise.probe(ipAddress);
  const { alive, time } = res;

  pingCheck.lastCheck = Date.now();
  pingCheck.status = alive;
  
  // Controlla se la latenza è "unknown" e gestisci l'errore di casting
  if (time === "unknown") {
    pingCheck.latency = 99999; // Assegna un valore predefinito, ad esempio 0
  } else {
    pingCheck.latency = time;
  }
  
  pingCheck.latencyHistory.push({
    timestamp: Date.now(),
    latency: pingCheck.latency
  });
  
  await pingCheck.save();
};


const checkAllPings = async () => {
  const pingChecks = await PingCheck.find({});
  for (let pingCheck of pingChecks) {
    if (Date.now() - pingCheck.lastCheck >= pingCheck.interval) {
      try {
        await checkPing(pingCheck);
      } catch (error) {
        // Se si verifica un errore nel ping, impostiamo lo stato su false
        pingCheck.status = false;
        await pingCheck.save();
        console.error(`Error checking ping for ${pingCheck.ipAddress}: ${error.message}`);
      }
    }
  }
};

// Funzione per eseguire la cancellazione delle occorrenze più vecchie di un giorno
const deleteOldPingChecks = async () => {
  const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000); // Calcola una data un giorno fa
  try {
    await PingCheck.deleteMany({ lastCheck: { $lt: oneDayAgo } });
    console.log('Old ping checks deleted');
  } catch (error) {
    console.error('Error deleting old ping checks:', error);
  }
};

// Pianifica l'esecuzione della funzione ogni giorno 
cron.schedule('0 0 * * *', deleteOldPingChecks); 





setInterval(checkAllPings, 1000); // Check all pings every 1 seconds

const updatePingCheck = async (req, res) => {
  const { id } = req.params;
  const { ipAddress, interval } = req.body;

  try {
    const pingCheck = await PingCheck.findByIdAndUpdate(
      id,
      { ipAddress, interval },
      { new: true }
    );
    if (!pingCheck) {
      return res.status(404).json({ message: 'Ping check not found' });
    }
    res.status(200).json({ message: 'Ping check updated', pingCheck });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const deletePingCheck = async (req, res) => {
  const { id } = req.params;

  try {
    const pingCheck = await PingCheck.findByIdAndDelete(id);
    if (!pingCheck) {
      return res.status(404).json({ message: 'Ping check not found' });
    }
    res.status(200).json({ message: 'Ping check deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  createPingCheck,
  getPingChecks,
  updatePingCheck,
  deletePingCheck
};
