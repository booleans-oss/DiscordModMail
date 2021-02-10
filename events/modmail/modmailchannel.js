let ticket = 0;
// Le nombre de tickets créés
const EventBase = require('../../utils/assets/EventBase');
module.exports = class ModMailChannelEvent extends EventBase {
    constructor() {
        super('modmailchannel');
    }
    async run(client, message) {
        if (message.author.bot) return;
        let guild = client.guilds.cache.get(process.env.GUILD_ID);
        // On prend en compte le serveur


        let channel = client.channels.cache.get(process.env.CHANNEL_STAFF)
        // OU message.guild.channels.cache.find(channel => channel.name === "LE NOM DU CHANNEL")


        // On prend en compte le channel des staffs (dans lequel les messages seront envoyeés)
        let role = guild.roles.cache.get(process.env.ROLE_STAFF)
        // OU message.guild.roles.cache.find(role => role.name === "NOM DU ROLE");
        // Le rôle staff que la personne doit avoir pour accepter/refuser

        if (this.time.has(message.author.id)) return message.channel.send("Tu as fermé un ticket trop récemment.");
        // Vérification que l'utilisateur n'as pas eu de ticket récemment
        if (!this.seen.has(message.author.id)) {
            // Vérification que l'utilisateur n'a pas de ticket ouvert en en cours
            this.seen.set(message.author.id, message.channel.id)
            // Ajout de l'utilisateur dans la map (l'utilisateur a un ticket)
            message.channel.send("Votre ticket a bien été pris en compte.")
            // Message de confirmation pour l'utilisateur
            let messagetostaff = await channel.send(message.content);
            // Envoie du message de l'utilisateur dans le channel staff
            await messagetostaff.react("❌");
            // Réaction "annuler" sur la demande de ticket
            await messagetostaff.react("🟢");
            // Réaction "accepter" sur la demande de ticket
            try {
                let filtre = (reaction, user) => ["❌", "🟢"].includes(reaction.emoji.name) && !user.bot && guild.member(user.id).roles.cache.has(role);
                // Vérification que la réaction est ❌ ou 🟢 et que l'utilisateur ne soit pas le bot, et que l'utilisateur ait le rôle staff
                let reactionCollection = await messagetostaff.awaitReactions(filtre, {
                    max: 1,
                    time: 86400000
                });
                // Collection de la première réaction ajoutée
                let choix = reactionCollection.get("❌") || reactionCollection.get("🟢");
                // La réaction qui a été ajoutée, soit ❌ ou 🟢;
                if (choix.emoji.name === "❌") {
                    // Si le staff refuse
                    message.author.send("Votre ticket a été refusé.");
                    // Message de refus envoyé à l'utilisateur
                    this.seen.delete(message.author.id)
                    // Suppression de l'utilisateur dans la map des tickets ouverts
                    time.set(message.author.id, message.channel);
                    // Ajout de l'utilisateur dans la map des tickets récents
                    setTimeout(() => {
                        // Délai pour que l'utilisateur ne puisse pas ouvrir des tickets toutes les secondes
                        time.delete(message.author.id);
                        // Suppresion de l'utilisateur dans la map des tickets récents
                    }, 100000)
                    // Après 100 secondes
                } else {
                    // Si le staff a validé
                    message.author.send("Votre ticket a été accepté.");
                    // Message d'acceptation du ticket envoyé à l'utilisateur
                    ticket++
                    // Le nombre de ticket augmente
                    let newchannel = await channel.guild.channels.create(`ticket-${ticket}`, {
                        // Création du channel avec ce nom "ticket-{numero}"
                        type: "text",
                        // Type du channel pour que ce soit un channel textuel
                        permissionOverwrites: [
                            // Les permissions du channel
                            {
                                id: message.author.id,
                                // L'utilisateur qui a demandé le ticket
                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ADD_REACTIONS"]
                                // Il puisse voir le channel, envoyer des messages, et ajouter des réactions
                            },
                            {
                                id: channel.guild.id,
                                // @everyone
                                deny: ["VIEW_CHANNEL"]
                                // Interdiction de voir le channel
                            },
                            {
                                id: role.id,
                                // Le rôle staff
                                allow: ["SEND_MESSAGE", "VIEW_CHANNEL", "ADD_REACTIONS", "MANAGE_MESSAGES"]
                                // Il puisse voir le channel, envoyer des messages et gérer les messages
                            }
                        ]
                    })
                    newchannel.send(`Le ticket de ${user.username} a été accepté. Pour la raison **${message.content}**`);
                    // Message de confirmation de la création du channel dans le nouveau channel
                    collectors(newchannel, message);
                    // Début de la collection des messages entre les MP et du nouveau channel
                }
            } catch (err) {
                console.log(err)
                // Console.log s'il y a une erreur
                message.author.send("Votre requête n'a pas été convaincante.");
                // Envoie du message que le staff n'a pas pu ajouter de réaction dans le temps imparti
                this.seen.delete(message.author.id);
                // Suppression de l'utilisateur dans la map des tickets ouverts
                this.time.add(message.author.id, message.channel);
                // Ajout de l'utilisateur dans la map des tickets récents
                setTimeout(() => {
                    // Délai pour que l'utilisateur ne puisse pas créer de ticket dans les secondes qui suivent
                    this.time.delete(message.author.id);
                    // Suppression de l'utilisateur dans les tickets récents
                }, 10000);
                // Après 10 secondes
            }
        }
        /**
         * Gestion des collectors.
         * @param {Object} message - Le message qui a été envoyé en MP
         * @param {Object} channel - Le channel staff.
         */
        function collectors(channel, message) {
            // Déclaration de la fonction des collectors
            let filterStaff = m => m.channel.id === channel.id && !m.author.bot && m.member.roles.cache.has(role);
            // Filtre des messages dans le channel staff, le channel doit être le channel staff et l'auteur ne doit pas être le bot
            let channelCollector = channel.createMessageCollector(filterStaff);
            // Déclaration du collector dans le channel staff
            let filterDM = m => m.channel.id === message.channel.id && m.author.id === message.author.id;
            // Filtre des messages dans les MP, le channel doit être le MP de l'utilisateur, et l'auteur doit être l'utilisateur
            let DMCollector = message.channel.createMessageCollector(filterDM);
            // Déclaraction du collector dans les MP
            DMCollector.on("collect", m => {
                // Début de la collection des messages en MP
                if (m.attachments.size !== 0) {
                    // Vérification que le message contient des fichiers
                    getImages(m.attachments, channel)
                    // Si oui, il exécute la fonction "getImages" déclarée en bas
                }
                channel.send(m.content);
                // Envoie le contenu du message de l'utilisateur dans le channel des staffs
            })
            channelCollector.on("collect", m => {
                // Début de la collection des messages des staffs
                if (m.content === "!fermer") {
                    // Si le message est la commande "!fermer"
                    message.channel.send("Votre ticket a été fermé par le staff.")
                    // Envoie du message de confirmation dans les MP de l'utilisateur
                    m.channel.send("Le ticket a bien été fermé");
                    // Envoie du message de confirmation dans le channel Staff
                    this.seen.delete(message.author.id)
                    // Suppression de l'utilisateur dans la Map des tickets ouverts
                    this.time.set(message.author.id, message.channel)
                    // Ajout de l'utilisateur dans la Map des tickets récents
                    setTimeout(() => {
                        // Délai pour que l'utilisateur ne puisse pas créer de ticket dans les secondes qui suivent
                        this.time.delete(message.author.id);
                        // Suppression de l'utilisateur dans les tickets récents
                    }, 10000);
                    // Après 10 secondes
                    DMCollector.stop();
                    // Arrêt du collector dans les MP(aucun message ne sera connecté et envoyé)
                    channelCollector.stop();
                    // Arrêt du collector dans le channel staff(aucun message ne sera connecté et envoyé)
                } else {
                    if (m.attachments.size !== 0) {
                        // Vérification que le message contient des fichiers
                        getImages(m.attachments, channel)
                        // Si oui, il exécute la fonction "getImages" déclarée en bas
                    }
                    message.channel.send(m.content);
                    // Envoie le contenu du message envoyé par le staff dans les MP de l'utilisateur
                }

            })
        }
        /**
         * Gestion des images.
         * @param {Object} channel - Le channel en question (staff ou MP)
         * @param {Array} fichiers - Tableau des fichiers envoyés.
         */
        function getImages(fichiers, channel) {
            // Déclaraction de la fonction "getImages" qui prend en paramètres, les fichiers du message, et le channel où ils ont été envoyé
            const validation = /^.*(gif|png|jpg|jpeg)$/g;
            // Expression RegEx qui filtre les fichiers pour que ça ne soit que des images, et des gifs
            let images = fichiers.array().filter(image => validation.test(image.url)).map(image => image.url);
            // Crée un tableau avec les liens des images, après filtrer pour que ce ne soit que des images
            channel.send({
                files: images
            });
            // Envoie les images dans le channel
        }
    }
};